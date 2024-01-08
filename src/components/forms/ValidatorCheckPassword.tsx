import { useState } from 'react';
import InputTextLabel from './input/InputTextLabel';

import styles from './Form.module.scss';

export default function ValidatorCheckPassword({
  label,
  id,
  value,
  setValue,
}: {
  label: string;
  id: string;
  value: string;
  setValue: any;
}) {
  // const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    setValue(value);

    // 유효성 검사
    if (value?.length < 8) {
      setError('비밀번호는 8자리 이상으로 입력해주세요');
    } else {
      setError('');
    }
  };
  return (
    <div>
      <InputTextLabel
        type="password"
        label={label}
        id={id}
        value={value}
        onChange={onChange}
        required
      />
      {error && (
        <p className={styles.error}>비밀번호는 8자리 이상으로 입력해주세요</p>
      )}
    </div>
  );
}
