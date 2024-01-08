import { useState } from 'react';
import InputTextLabel from './input/InputTextLabel';

import styles from './Form.module.scss';
export default function ValidatorCheckEmail() {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    setValue(value);

    // 유효성 검사
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!value?.match(validRegex)) {
      setError('이메일 형식이 올바르지 않습니다.');
    } else {
      setError(null);
    }
  };
  return (
    <div>
      <InputTextLabel
        label="이메일"
        type="email"
        id="user-id"
        value={value}
        onChange={onChange}
        required
      />
      {error && (
        <p className={styles.error}>이메일 형식이 올바르지 않습니다.</p>
      )}
    </div>
  );
}
