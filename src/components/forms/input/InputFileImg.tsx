import { useRef } from 'react';

import styles from './InputFileImg.module.scss';
import classNames from 'classnames';

import { NO_PROFILE } from 'constants/index';
import SVGImage from 'components/svg/SVGImage';
import SVGClose from 'components/svg/SVGClose';

interface InputFileLabelProps {
  id?: string;
  type?: string;
  label?: string;
  value?: string | null;
  setValue?: any;
  required?: boolean;
  disabled?: boolean;
  labelHidden?: boolean;
  className?: string;
}

export default function InputFileImg(props: InputFileLabelProps) {
  const {
    id,
    label,
    labelHidden,
    className,
    required,
    value,
    setValue,
    ...rest
  } = props;

  const fileRef = useRef<HTMLInputElement | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;

    const file = files?.[0];
    const fileReader = new FileReader();
    if (file) {
      fileReader?.readAsDataURL(file);
      fileReader.onloadend = (e: any) => {
        const { result } = e?.currentTarget;
        setValue(result);
      };
    }
  };

  const handleDeletePreviewImg = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (fileRef.current) {
      fileRef.current.value = '';
    }

    setValue(null);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.input_btn}>
        <input
          className={classNames(styles.input, className)}
          type={'file'}
          id={id}
          name={id}
          onChange={onChange}
          ref={fileRef}
          {...rest}
        />
        <label className={styles.label} htmlFor={id}>
          <SVGImage fill="gray00" />
          <span className="a11y-hidden">
            {label} {required && '필수'}
          </span>
        </label>
      </div>

      <img className={styles.preview} src={value ? value : NO_PROFILE} alt="" />

      {value && (
        <button
          type="button"
          className={styles.del_btn}
          onClick={handleDeletePreviewImg}>
          <SVGClose fill="statusWarn" />
          <span className="a11y-hidden">삭제</span>
        </button>
      )}
    </div>
  );
}
