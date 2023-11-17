import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// firebase
import { db, storage } from 'firebaseApp';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from 'firebase/storage';

// lib
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

// utils
import AuthContext from 'context/AuthContext';

// components
import Btn from 'components/atoms/Button/Btn';
import InputTextLabel from '../molecules/InputTextLabel';
import TextareaLabel from '../molecules/TextareaLabel';
import SelectLabel from 'components/molecules/SelectLabel';
import InputFileLabel from 'components/molecules/InputFileLabel';

export type CategoryType = 'Frontend' | 'Backend' | 'Web' | 'Native';
export const CATEGORIES: CategoryType[] = [
  'Frontend',
  'Backend',
  'Web',
  'Native',
];

interface PostFormProps {
  post?: any;
}

export default function PostForm({ post }: PostFormProps) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<CategoryType | null>(null);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setSummary(post.summary);
      setContent(post.content);
      setCategory(post.categoty);
      setPreviewImg(post.imgUrl);
      setCategory(post.category);
    }
  }, [post]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    const imgKey = `${user?.uid}/${uuidv4()}`;
    const storageRef = ref(storage, imgKey);
    e.preventDefault();

    try {
      if (post && post?.id) {
        // 수정
        let imgUrl = null;
        if (post?.imgUrl === previewImg) {
          // 기존 이미지
          imgUrl = previewImg;
        } else if (post?.imgUrl && post?.imgUrl !== previewImg) {
          // 다른이미지 교체 : 기존이미지 삭제
          const imageRef = ref(storage, post?.imgUrl);
          await deleteObject(imageRef).catch((error) => {
            console.log(error);
          });
          if (previewImg) {
            const data = await uploadString(storageRef, previewImg, 'data_url');
            imgUrl = await getDownloadURL(data?.ref);
          }
        }

        const postRef = doc(db, 'posts', post?.id);
        await updateDoc(postRef, {
          title: title,
          summary: summary,
          content: content,
          updateAt: new Date()?.toLocaleDateString('ko', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
          category: category,
          imgUrl: imgUrl,
        });

        toast.success('게시글 수정작성 완료!');
        navigate(`/post/${post?.id}`);
      } else {
        // 작성
        // 이미지 우선 업로드
        let imgUrl = '';
        if (previewImg) {
          const data = await uploadString(storageRef, previewImg, 'data_url');
          imgUrl = await getDownloadURL(data?.ref);
        }

        await addDoc(collection(db, 'posts'), {
          title: title,
          summary: summary,
          content: content,
          createAt: new Date()?.toLocaleDateString('ko', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
          email: user?.email,
          uid: user?.uid,
          category: category,
          imgUrl: imgUrl,
        });

        toast.success('게시글 작성 완료!');
        navigate('/post');
      }
      setPreviewImg(null);
      setIsSubmitting(false);
      // fireabase로 데이터 생성
    } catch (error: any) {
      console.log(error);
      toast.error(error?.code);
    }
  };

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'postTitle') {
      setTitle(value);
    }

    if (name === 'postSummary') {
      setSummary(value);
    }

    if (name === 'postContent') {
      setContent(value);
    }
    if (name === 'postCategory') {
      setCategory(value as CategoryType);
    }
  };

  const handleDeletePreviewImg = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPreviewImg(null);
  };

  return (
    <form onSubmit={onSubmit}>
      <InputTextLabel
        label="제목"
        id="postTitle"
        onChange={onChange}
        value={title}
      />

      <SelectLabel
        label="카테고리"
        id="postCategory"
        onChange={onChange}
        options={CATEGORIES}
        value={category ? category : ''}
        text="카테고리를 선택해 주세요"
      />

      <InputTextLabel
        label="요약"
        id="postSummary"
        onChange={onChange}
        value={summary}
      />

      <InputFileLabel
        label="썸네일"
        id="postThumbnail"
        setValue={setPreviewImg}
        accept="images/*"
        isSubmitting={isSubmitting}
      />

      {previewImg && (
        <>
          <img src={previewImg} alt="이미지 미리보기" />
          <button type="button" onClick={handleDeletePreviewImg}>
            삭제
          </button>
        </>
      )}

      <TextareaLabel
        label="내용"
        id="postContent"
        onChange={onChange}
        value={content}
      />
      <Btn type="submit">{post ? '수정' : '제출'}</Btn>
    </form>
  );
}
