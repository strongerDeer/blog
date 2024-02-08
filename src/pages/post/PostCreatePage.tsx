import { useContext, useState } from 'react';

import './wrap.scss';
import styles from './PostCreatePage.module.scss';

// lib
import { v4 as uuidv4 } from 'uuid';

import AuthContext from 'contexts/AuthContext';

// components
import SVGWrite from 'components/svg/SVGWrite';
import Btn from 'components/commons/button/Btn';
import InputHashTag from 'components/forms/input/InputHashTag';
import InputTextLabel from 'components/forms/input/InputTextLabel';
import InputThumbnailImg from 'components/forms/input/InputThumbnailImg';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { db, storage } from 'firebaseApp';
import { addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BackBtn from 'components/commons/button/BackBtn';
import classNames from 'classnames';
import TodayImage from 'components/post/TodayImage';

export default function PostCreatePage({ post }: any) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [contents, setContens] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
      if (previewImg) {
        if (previewImg.includes('unsplash')) {
          imgUrl = previewImg;
        } else {
          const data = await uploadString(storageRef, previewImg, 'data_url');
          imgUrl = await getDownloadURL(data?.ref);
        }
      }

      // 에디터 변경 작업

      await addDoc(collection(db, 'posts'), {
        title: title,
        content: contents,
        createdAt: new Date()?.toLocaleDateString('ko', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        email: user?.email,
        uid: user?.uid,
        // 카테고리 추가 작업
        // category: category,
        imgUrl: imgUrl,
        hashTags: tags,
      });

      toast.success('게시글 작성 완료!');
      navigate('/post');

      setTags([]);
      setPreviewImg(null);
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <TodayImage />
      <div className={classNames('wrap', styles.wrap)}>
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
            onChange={(e) => setContens(e.target.value)}
            placeholder="입력해주세요!"
            value={contents}
          />

          <InputHashTag tags={tags} setTags={setTags} />

          <div className={styles.btnGroup}>
            {/* 
            <Btn></Btn>
            <Btn>삭제</Btn> */}
            <Btn onClick={goback}>취소</Btn>
            <Btn type="submit" fillPrimary>
              <SVGWrite />
              {post ? '수정' : '제출'}
            </Btn>
          </div>

          <BackBtn className="backBtn" />
        </form>
      </div>
    </>
  );
}
