import { useState } from 'react';

// toastify
import { toast } from 'react-toastify';

// firebase
import { app } from 'firebaseApp';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// components
import FormSet from 'components/organisms/FormSet';

export default function SignupTemp() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [error, setError] = useState<string>('');

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
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('회원가입 성공🥳');
    } catch (error: any) {
      let errorMsg = error?.code;

      if ((errorMsg = 'auth/email-already-in-use')) {
        errorMsg = '이미 사용중인 이메일입니다.';
      }
      toast.error(errorMsg);
    }
  };

  return (
    <FormSet
      email={email}
      password={password}
      passwordConfirm={passwordConfirm}
      error={error}
      onChange={onChange}
      onSubmit={onSubmit}
      signup
    />
  );
}
