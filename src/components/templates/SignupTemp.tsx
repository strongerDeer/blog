import FormSet from 'components/organisms/FormSet';
import { useState } from 'react';

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

    console.log(error);
  };

  return (
    <FormSet
      email={email}
      password={password}
      passwordConfirm={passwordConfirm}
      error={error}
      onChange={onChange}
      signup
    />
  );
}
