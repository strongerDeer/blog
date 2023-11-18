import InputFileLabel from 'components/molecules/InputFileLabel';
import InputTextLabel from 'components/molecules/InputTextLabel';
import AuthContext from 'context/AuthContext';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { db, storage } from 'firebaseApp';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// lib
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import styles from './ProfileForm.module.scss';
import Btn from 'components/atoms/Button/Btn';
import { addDoc, collection } from 'firebase/firestore';

export default function ProfileForm() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleDeletePreviewImg = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPreviewImg(null);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    switch (name) {
      case 'user-nickname':
        setNickname(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);

    const imgKey = `${user?.uid}/${uuidv4()}`;
    const storageRef = ref(storage, imgKey);

    try {
      let image = null;
      if (previewImg) {
        const data = await uploadString(storageRef, previewImg, 'data_url');
        image = await getDownloadURL(data?.ref);
      }

      await addDoc(collection(db, 'users'), {
        image: image,
        nickname: nickname,
        createAt: new Date()?.toLocaleDateString('ko', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        email: user?.email,
        uid: user?.uid,
      });

      toast.success('프로필 작성 완료!');
      // navigate('/profile');

      setPreviewImg(null);
      setIsSubmitting(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.code);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.profile}>
        <img
          src={previewImg ? previewImg : '/images/noimg.png'}
          alt="이미지 미리보기"
        />
        <InputFileLabel
          label="썸네일"
          id="postThumbnail"
          setValue={setPreviewImg}
          accept="images/*"
          isSubmitting={isSubmitting}
        />
        {previewImg && (
          <button type="button" onClick={handleDeletePreviewImg}>
            삭제
          </button>
        )}
      </div>

      <div>
        <InputTextLabel
          label="아이디"
          type="email"
          id="user-id"
          value={user?.email ? user?.email : ''}
          onChange={onChange}
          disabled
        />
      </div>

      <InputTextLabel
        label="닉네임"
        type="text"
        id="user-nickname"
        // value={nickname}
        onChange={onChange}
      />
      {/* <div>
        <InputTextLabel
          label="비밀번호"
          type="password"
          id="user-pw"
          // value={password}
          onChange={onChange}
        />
      </div> */}

      <Btn type="submit">프로필 생성</Btn>
    </form>
  );
}
