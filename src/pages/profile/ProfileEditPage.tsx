import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from 'components/forms/Form.module.scss';

//components
import Btn from 'components/commons/button/Btn';
import InputFileImg from 'components/forms/input/InputFileImg';
import InputTextLabel from 'components/forms/input/InputTextLabel';
import ValidatorCheckEmail from 'components/forms/ValidatorCheckEmail';
import ValidatorCheckPassword from 'components/forms/ValidatorCheckPassword';

// firebase
import { app, storage } from 'firebaseApp';
import { getAuth, updatePassword, updateProfile } from 'firebase/auth';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from 'firebase/storage';

// lib
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import AuthContext from 'contexts/AuthContext';

const STORAGE_DOWNLOAD_URL_STR = 'https://firebasestorage.googleapis.com';

export default function ProfileEditPage() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isFilled, setIsFilled] = useState<boolean>(false);
  const [previewImg, setPreviewImg] = useState<string>(user?.photoURL || '');
  const [email, setEmail] = useState<string>(user?.email || '');
  const [nickname, setNickname] = useState<string>(user?.displayName || '');

  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  const [error, setError] = useState<string | null>(null);

  const isEmailID = user?.provider === 'password';

  useEffect(() => {
    if (passwordConfirm?.length > 0 && password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다!');
    } else {
      setError(null);
    }
  }, [password, passwordConfirm]);

  useEffect(() => {
    if (isEmailID) {
      if (
        nickname.length >= 1 &&
        password.length >= 8 &&
        passwordConfirm.length >= 8
      ) {
        setIsFilled(true);
      } else {
        setIsFilled(false);
      }
    } else {
      if (nickname.length >= 1) {
        setIsFilled(true);
      } else {
        setIsFilled(false);
      }
    }
  }, [nickname, password, passwordConfirm, isEmailID]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let profileUrl = previewImg as string | null;

    if (user?.photoURL && !previewImg) {
      if (user?.photoURL && user?.photoURL.includes(STORAGE_DOWNLOAD_URL_STR)) {
        const imgRef = ref(storage, user?.photoURL);
        await deleteObject(imgRef).catch((error: any) => {
          console.log(error);
        });
      }
    } else if (previewImg && previewImg !== user?.photoURL) {
      // 프로필 이미지가 있고, 이전 프로필과 같지 않을 때!
      // firebase storage에 이전 이미지가 있다면! 삭제
      if (user?.photoURL && user?.photoURL.includes(STORAGE_DOWNLOAD_URL_STR)) {
        const imgRef = ref(storage, user?.photoURL);
        await deleteObject(imgRef).catch((error: any) => {
          console.log(error);
        });
      }

      // firebase storage 이미지 업로드
      const imgKey = `${user?.uid}/${uuidv4()}`;
      const storageRef = ref(storage, imgKey);
      const data = await uploadString(storageRef, previewImg, 'data_url');
      profileUrl = data?.ref ? await getDownloadURL(data.ref) : null;
    }

    try {
      const auth = getAuth(app);
      if (auth.currentUser) {
        try {
          await updateProfile(auth.currentUser, {
            displayName: nickname,
            photoURL: profileUrl || '',
          });

          if (password) {
            await updatePassword(auth.currentUser, password);
          }

          setUser({
            ...user,
            displayName: nickname,
            photoURL: profileUrl || '',
          });

          toast.success('프로필 업데이트 성공!');

          navigate('/mypage');
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error: any) {
      let errorMsg = error?.code;
      console.log(errorMsg);
    }
  };

  return (
    <section className={styles.wrap}>
      <h2 className={styles.title}>프로필 수정</h2>

      <form className={styles.form} onSubmit={onSubmit}>
        {/* 이메일 */}

        <InputFileImg
          label="프로필 이미지"
          id="user-profile"
          value={previewImg || null}
          setValue={setPreviewImg}
        />

        <ValidatorCheckEmail value={email} setValue={setEmail} disabled />

        <InputTextLabel
          label="닉네임"
          id="user-nickname"
          value={nickname}
          setValue={setNickname}
          required
        />

        {isEmailID && (
          <>
            {/* 비밀번호 */}
            <ValidatorCheckPassword
              label="비밀번호 (8자 이상)"
              id="user-pw"
              value={password}
              setValue={setPassword}
              required
            />
            <ValidatorCheckPassword
              label="비밀번호 재확인 (8자 이상)"
              id="user-pw2"
              value={passwordConfirm}
              setValue={setPasswordConfirm}
              required
            />
          </>
        )}

        {error && <p className={styles.error}>{error}</p>}

        <Btn type="submit" fillPrimary disabled={!isFilled}>
          수정
        </Btn>
      </form>
    </section>
  );
}
