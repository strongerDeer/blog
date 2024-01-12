import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from 'components/forms/Form.module.scss';

//components
import Btn from 'components/commons/button/Btn';
import InputFileImg from 'components/forms/input/InputFileImg';
import InputTextLabel from 'components/forms/input/InputTextLabel';
import SNSLoginBtn from 'components/login/SNSLoginBtn';
import ValidatorCheckEmail from 'components/forms/ValidatorCheckEmail';
import ValidatorCheckPassword from 'components/forms/ValidatorCheckPassword';

// firebase
import { app, db, storage } from 'firebaseApp';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

// lib
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

export default function SignupPage() {
  const navigate = useNavigate();

  const [profileImg, setProfileImg] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (passwordConfirm?.length > 0 && password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다!');
    } else {
      setError(null);
    }
  }, [password, passwordConfirm]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password).then(
        async (userCredential) => {
          // 이미지키 생성
          const imgKey = `${userCredential.user.uid}/${uuidv4()}`;
          const storageRef = ref(storage, imgKey);
          const data = await uploadString(storageRef, profileImg, 'data_url');
          const profileUrl = await getDownloadURL(data?.ref);

          try {
            await setDoc(doc(db, 'users', userCredential.user.uid), {
              email: userCredential.user.email,
              nickname: nickname,
              profileUrl: profileUrl,
            });
            toast.success('회원가입 성공!');
            navigate('/');
          } catch (error) {
            console.log(error);
          }
        },
      );
      // 완료후 경로 이동
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.wrap}>
      <h2 className={styles.title}>회원가입</h2>

      <form className={styles.form} onSubmit={onSubmit}>
        {/* 이메일 */}

        <InputFileImg
          label="프로필 이미지"
          id="user-profile"
          value={profileImg}
          setValue={setProfileImg}
        />

        <ValidatorCheckEmail value={email} setValue={setEmail} required />

        <InputTextLabel
          label="닉네임"
          id="user-nickname"
          value={nickname}
          setValue={setNickname}
          required
        />

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
        {error && <p className={styles.error}>{error}</p>}

        <Btn type="submit" fillPrimary>
          회원가입
        </Btn>
      </form>

      <p className={styles.or}>or</p>

      <div className={styles.sns_login}>
        <SNSLoginBtn type="Google" />
        <SNSLoginBtn type="GitHub" />
      </div>
    </section>
  );
}
