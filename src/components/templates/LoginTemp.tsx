import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// toastify
import { toast } from 'react-toastify';

// firebase
import { app } from 'firebaseApp';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// components
import FormSet from 'components/organisms/FormSet';

export default function LoginTemp() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('로그인 성공🥳');
      navigate('/');
    } catch (error: any) {
      console.log(error?.code);
      let errorMsg = error?.code;
      if ((errorMsg = 'auth/invalid-login-credentials')) {
        errorMsg = '아이디와 비밀번호를 다시 확인해주세요!';
      }
      toast.error(errorMsg);
    }
  };
  return (
    <FormSet
      email={email}
      password={password}
      error={error}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}
