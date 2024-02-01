import { useContext, useEffect, useState } from 'react';

import styles from './PostCreatePage.module.scss';

// firebase
import { db, storage } from 'firebaseApp';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from 'firebase/storage';

// lib
import { v4 as uuidv4 } from 'uuid';

import AuthContext from 'contexts/AuthContext';

// components
import SVGWrite from 'components/svg/SVGWrite';
import Btn from 'components/commons/button/Btn';
import InputHashTag from 'components/forms/input/InputHashTag';
import InputTextLabel from 'components/forms/input/InputTextLabel';
import InputThumbnailImg from 'components/forms/input/InputThumbnailImg';

import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { PostInterface } from 'interface';

export default function PostEditPage() {
  const params = useParams();
  // 기존 데이터 가져오기
  const [post, setPost] = useState<PostInterface | null>(null);

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);

      setPost({ id: docSnap.id, ...(docSnap.data() as PostInterface) });
    }
  };

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, [params?.id]);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      // setSummary(post.summary);
      setContents(post.content);
      // setCategory(post.categoty);

      if (post.imgUrl) {
        setPreviewImg(post.imgUrl);
      }
      if (post.hashTags) {
        setTags(post.hashTags);
      }
    }
  }, [post]);

  const goback = () => {
    navigate(-1);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const imgKey = `${user?.uid}/${uuidv4()}`;
    const storageRef = ref(storage, imgKey);

    try {
      let imgUrl = null;

      if (post) {
        if (post.imgUrl === previewImg) {
          // 변경 없음
          imgUrl = previewImg;
        } else {
          // 변경있음

          if (post.imgUrl && post.imgUrl.includes('firebasestorage')) {
            // 기존 이미지가 스토리지경우 : 이미지  삭제
            const imageRef = ref(storage, post?.imgUrl);
            await deleteObject(imageRef).catch((error) => {
              console.log(error);
            });
          }

          if (previewImg) {
            if (previewImg?.includes('unsplash')) {
              imgUrl = previewImg;
            } else {
              const data = await uploadString(
                storageRef,
                previewImg,
                'data_url',
              );
              imgUrl = await getDownloadURL(data?.ref);
            }
          }
        }
      }

      if (post?.id) {
        const postRef = doc(db, 'posts', post.id);

        await updateDoc(postRef, {
          title: title,
          // summary: summary,
          content: contents,
          updateAt: new Date()?.toLocaleDateString('ko', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
          // category: category,
          imgUrl: imgUrl,
          hashTags: tags,
        });

        toast.success('게시글 수정작성 완료!');
        navigate(`/post`);
        // navigate(`/post/${post?.id}`);
      }

      setTags([]);
      setPreviewImg(null);
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.wrap}>
      {/* 오늘 날짜 */}
      <InputThumbnailImg
        label="썸네일 이미지"
        id="post-thumbnail"
        value={previewImg}
        setValue={setPreviewImg}
        isSubmitting={isSubmitting}
      />

      <form className={styles.form} onSubmit={onSubmit}>
        {/* 카테고리 */}

        <div>
          <InputTextLabel
            label="제목"
            id="postTitle"
            value={title}
            setValue={setTitle}
            maxLength={50}
            required
          />
        </div>

        <textarea
          onChange={(e) => setContents(e.target.value)}
          placeholder="입력해주세요!"
          value={contents}
        />

        <InputHashTag tags={tags} setTags={setTags} />

        <div className={styles.btnGroup}>
          <Btn onClick={goback}>취소</Btn>
          <Btn>삭제</Btn>
          <Btn type="submit" fillPrimary>
            <SVGWrite />
            {post ? '수정' : '제출'}
          </Btn>
        </div>
        <Btn onClick={goback}>뒤로가기</Btn>
      </form>
    </div>
  );
}
