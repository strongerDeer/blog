import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// firebase
import { app } from 'firebaseApp';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

// toastify
import { toast } from 'react-toastify';

// components

import InputTextLabel from '../../../components/commons/input/InputTextLabel';

// style
import styles from './SignForm.module.scss';
import Btn from 'components/commons/button/Btn';

interface SignFormProps {
  signup?: boolean;
}

export default function SignForm({ signup }: SignFormProps) {
  const text = signup ? '회원가입' : '로그인';

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    switch (name) {
      case 'user-id':
        setEmail(value);

        // 유효성 검사
        const validRegex =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!value?.match(validRegex)) {
          setError('이메일 형식이 올바르지 않습니다.');
        } else {
          setError('');
        }
        break;
      case 'user-pw':
        setPassword(value);
        // 패스워드 길이
        if (value?.length < 8) {
          setError('비밀번호는 8자리 이상으로 입력해주세요');
        } else if (passwordConfirm?.length > 0 && value !== passwordConfirm) {
          setError('비밀번호가 일치하지 않습니다');
        } else {
          setError('');
        }
        break;
      case 'user-pw2':
        setPasswordConfirm(value);
        // 패스워드 길이
        if (value?.length < 8) {
          setError('비밀번호는 8자리 이상으로 입력해주세요');
        } else if (value !== password) {
          setError('비밀번호가 일치하지 않습니다');
        } else {
          setError('');
        }
        break;
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const auth = getAuth(app);
      if (signup) {
        // 회원가입
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success('회원가입 성공🥳');
      } else {
        // 로그인
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('로그인 성공🥳');
      }
      navigate('/');
    } catch (error: any) {
      let errorMsg = error?.code;

      // 로그인
      if ((errorMsg = 'auth/invalid-login-credentials')) {
        errorMsg = '아이디와 비밀번호를 다시 확인해주세요!';
      }

      // 회원가입
      if ((errorMsg = 'auth/email-already-in-use')) {
        errorMsg = '이미 사용중인 이메일입니다.';
      }

      toast.error(errorMsg);
    }
  };

  return (
    <div className={styles['form-wrap']}>
      <h2 className={styles.title}>{text}</h2>
      {error && error?.length > 0 && <p className={styles.errorMsg}>{error}</p>}
      <form onSubmit={onSubmit} className={styles['sign-form']}>
        <div>
          <InputTextLabel
            label="아이디"
            type="email"
            id="user-id"
            value={email}
            onChange={onChange}
          />
        </div>
        <div>
          <InputTextLabel
            label="비밀번호"
            type="password"
            id="user-pw"
            value={password}
            onChange={onChange}
          />
        </div>
        {signup && (
          <div>
            <InputTextLabel
              label="비밀번호 확인"
              type="password"
              id="user-pw2"
              value={passwordConfirm}
              onChange={onChange}
            />
          </div>
        )}
        <Btn
          type="submit"
          disabled={
            (email === '' ||
            password === '' ||
            (passwordConfirm && passwordConfirm === '')
              ? true
              : undefined) || (error ? error?.length > 0 : undefined)
          }>
          {text}
        </Btn>
      </form>
    </div>
  );
}
