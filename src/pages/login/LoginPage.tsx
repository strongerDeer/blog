import Btn from 'components/commons/button/Btn';
import ValidatorCheckEmail from 'components/forms/ValidatorCheckEmail';
import ValidatorCheckPassword from 'components/forms/ValidatorCheckPassword';

import styles from 'components/forms/Form.module.scss';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from 'firebaseApp';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import SNSLoginBtn from 'components/login/SNSLoginBtn';

export default function LoginxPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      // 로그인
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('로그인 성공🥳');
      navigate('/');
    } catch (error: any) {
      let errorMsg = error?.code;
      if (errorMsg === 'auth/invalid-login-credentials') {
        setError('이메일과 비밀번호를 확인해주세요!');
      }
    }
  };
  return (
    <section className={styles.wrap}>
      <h2 className={styles.title}>로그인</h2>

      <form className={styles.form} onSubmit={onSubmit}>
        {/* 이메일 */}
        <ValidatorCheckEmail value={email} setValue={setEmail} />

        {/* 비밀번호 */}
        <ValidatorCheckPassword
          label="비밀번호"
          id="user-pw"
          value={password}
          setValue={setPassword}
        />

        {error && <p className={styles.error}>{error}</p>}
        <Btn type="submit" fillPrimary>
          로그인
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
