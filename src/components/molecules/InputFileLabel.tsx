import { useEffect } from 'react';
import styles from './Form.module.scss';

interface InputFileLabelProps {
  id?: string;
  label?: string;

  onChange?: any;
  required?: boolean;
  setValue?: any;
  accept?: string;
}

// required 추가
export default function InputFileLabel({
  id,
  label,
  required,
  setValue,
  accept,
}: InputFileLabelProps) {
  const onChange = (e: any) => {
    const {
      target: { files },
    } = e;
    // 파일 미리보기
    const file = files?.[0];
    const fileReader = new FileReader();
    fileReader?.readAsDataURL(file);
    fileReader.onloadend = (e: any) => {
      const { result } = e?.currentTarget;
      setValue(result);
    };

    // setValue();
  };
  return (
    <div className={styles.wrap}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type="file"
        className={styles.input}
        required={required}
        accept={accept}
        onChange={onChange}
      />
    </div>
  );
}
