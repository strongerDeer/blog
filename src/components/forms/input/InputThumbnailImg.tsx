import { useRef, useState } from 'react';

import styles from './InputThumbnailImg.module.scss';
import classNames from 'classnames';

import SVGImage from 'components/svg/SVGImage';
import SVGClose from 'components/svg/SVGClose';
import SVGSearch from 'components/svg/SVGSearch';
import SearchUnsplash from './SearchUnsplash';

interface InputFileLabelProps {
  id?: string;
  type?: string;
  label?: string;
  value?: string | null;
  setValue?: any;

  disabled?: boolean;
  labelHidden?: boolean;
  className?: string;
  style?: string;
}

export default function InputThumbnailImg(props: InputFileLabelProps) {
  const {
    id,
    label,
    labelHidden,
    className,

    value,
    setValue,
    style,
    ...rest
  } = props;

  const [viewUnsplash, setViewUnsplash] = useState<boolean>(false);

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
    setViewUnsplash(false);
  };

  return (
    <div className={classNames(styles.wrap, style && styles[style])}>
      <>
        {value ? (
          <img className={styles.preview} src={value} alt="" />
        ) : viewUnsplash ? (
          <SearchUnsplash
            setViewUnsplash={setViewUnsplash}
            unsplashImg={value}
            setUnsplashImg={setValue}
          />
        ) : (
          <div className={styles.noImg}>
            <p>썸네일 이미지를 삽입해 주세요</p>
            <div className={styles.btnGroup}>
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
                  <SVGImage fill="textSecondary" />
                  이미지 업로드
                </label>
              </div>
              <button
                type="button"
                className={styles.btnFind}
                onClick={() => setViewUnsplash(true)}>
                <SVGSearch fill="textSecondary" />
                이미지 찾기
              </button>
            </div>
          </div>
        )}
      </>

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
