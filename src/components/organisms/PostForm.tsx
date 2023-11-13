import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//toastify
import { toast } from 'react-toastify';

// firebase
import { db } from 'firebaseApp';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';

// components
import InputTextLabel from '../molecules/InputTextLabel';
import TextareaLabel from '../molecules/TextareaLabel';

// utils
import AuthContext from 'context/AuthContext';

import SelectLabel from 'components/molecules/SelectLabel';
import Btn from 'components/atoms/Button/Btn';
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
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<CategoryType>('Frontend');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setSummary(post.summary);
      setContent(post.content);
      setCategory(post.categoty);
    }
  }, [post]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (post && post?.id) {
        // 수정
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
        });
        toast.success('게시글 수정작성 완료!');
        navigate(`/post/${post?.id}`);
      } else {
        // 작성
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
        });

        toast.success('게시글 작성 완료!');
        // navigate('/post');
      }

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

  const handleDeleteThumbnail = (e: React.MouseEvent<HTMLButtonElement>) => {
    setThumbnail(null);
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
        setValue={setThumbnail}
        accept="images/*"
      />
      {thumbnail && (
        <>
          <img src={thumbnail} alt="이미지 미리보기" />
          <button type="button" onClick={handleDeleteThumbnail}>
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
