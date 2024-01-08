import Btn from 'components/commons/button/Btn';
import ValidatorCheckEmail from 'components/forms/ValidatorCheckEmail';
import ValidatorCheckPassword from 'components/forms/ValidatorCheckPassword';

import styles from 'components/forms/Form.module.scss';

import { useEffect, useState } from 'react';
import InputTextLabel from 'components/forms/input/InputTextLabel';

export default function SignupPage() {
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

  return (
    <section className={styles.wrap}>
      <h2 className={styles.title}>회원가입</h2>

      <form className={styles.form}>
        {/* 이메일 */}

        <label>프로필 이미지</label>
        <input type="file" />

        <ValidatorCheckEmail />

        <InputTextLabel
          label="닉네임"
          id="user-nickname"
          required
          // value={value}
          // onChange={onChange}
        />

        {/* 비밀번호 */}
        <ValidatorCheckPassword
          label="비밀번호 (8자 이상)"
          id="user-pw"
          value={password}
          setValue={setPassword}
        />
        <ValidatorCheckPassword
          label="비밀번호 재확인 (8자 이상)"
          id="user-pw2"
          value={passwordConfirm}
          setValue={setPasswordConfirm}
        />
        {error && <p className={styles.error}>{error}</p>}

        <Btn type="submit" fillPrimary>
          회원가입
        </Btn>
      </form>

      <p className={styles.or}>or</p>

      <div className={styles.sns_login}>
        <Btn>Google 회원가입</Btn>
        <Btn>GitHub 회원가입</Btn>
      </div>
    </section>
  );
}
