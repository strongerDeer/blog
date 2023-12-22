import InputFileLabel from 'components/commons/input/InputFileLabel';
import InputTextLabel from 'components/commons/input/InputTextLabel';
import AuthContext from 'contexts/AuthContext';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from 'firebase/storage';
import { db, storage } from 'firebaseApp';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// lib
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import styles from './ProfileForm.module.scss';
import Btn from 'components/commons/button/Btn';

import { updateProfile } from 'firebase/auth';
import { NO_IMG } from 'constants/noimg';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import useFindUser from 'hooks/useFindeUser';

const STORAGE_DOWNLOAD_URL_STR = 'https://firebasestorage.googleapis.com';

export default function ProfileForm() {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { users } = useFindUser(user?.uid ? user.uid : '');
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (user?.photoURL) {
      setPreviewImg(user.photoURL);
    }
    if (user?.displayName) {
      setNickname(user.displayName);
    }
  }, []);

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
    let imgUrl = null;

    try {
      if (user?.photoURL === previewImg) {
        imgUrl = previewImg;
      } else {
        if (
          user?.photoURL &&
          user?.photoURL?.includes(STORAGE_DOWNLOAD_URL_STR) &&
          user?.photoURL !== previewImg
        ) {
          const imgRef = ref(storage, user?.photoURL);
          await deleteObject(imgRef).catch((error: any) => {
            console.log(error);
          });
        }

        if (previewImg) {
          const data = await uploadString(storageRef, previewImg, 'data_url');
          imgUrl = await getDownloadURL(data?.ref);
        }
      }

      if (user) {
        await updateProfile(user, {
          displayName: nickname,
          photoURL: imgUrl || '',
        });
        // 사용자 정보 저장하기
        if (!users) {
          // 생성
          await addDoc(collection(db, 'users'), {
            email: user?.email,
            uid: user?.uid,
            displayName: nickname,
            photoURL: imgUrl || '',
          });
        } else if (users?.id) {
          // 업데이트
          const userRef = doc(db, 'users', users?.id);
          await updateDoc(userRef, {
            displayName: nickname,
            photoURL: imgUrl || '',
          });
        }
        toast.success('프로필 수정 완료!');
        navigate('/profile');
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.code);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.profile}>
        <img src={previewImg ? previewImg : NO_IMG} alt="이미지 미리보기" />
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
          value={user?.email ? user.email : ''}
          onChange={onChange}
          disabled
        />
      </div>

      <InputTextLabel
        label="닉네임"
        type="text"
        id="user-nickname"
        value={nickname ? nickname : ''}
        onChange={onChange}
      />

      <Btn type="submit">프로필 수정</Btn>
    </form>
  );
}
