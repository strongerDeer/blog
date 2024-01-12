import Btn from 'components/commons/button/Btn';
import ValidatorCheckEmail from 'components/forms/ValidatorCheckEmail';
import ValidatorCheckPassword from 'components/forms/ValidatorCheckPassword';

import styles from 'components/forms/Form.module.scss';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  return (
    <section className={styles.wrap}>
      <h2 className={styles.title}>로그인</h2>

      <form className={styles.form}>
        {/* 이메일 */}
        <ValidatorCheckEmail value={email} setValue={setEmail} />

        {/* 비밀번호 */}
        <ValidatorCheckPassword
          label="비밀번호"
          id="user-pw"
          value={password}
          setValue={setPassword}
        />

        <Btn type="submit" fillPrimary>
          로그인
        </Btn>
      </form>

      <p className={styles.or}>or</p>

      <div className={styles.sns_login}>
        <Btn>Google 로그인</Btn>
        <Btn>GitHub 로그인</Btn>
      </div>
    </section>
  );
}
