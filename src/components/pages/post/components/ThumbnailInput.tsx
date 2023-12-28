import { useState } from 'react';

import InputFileLabel from 'components/commons/input/InputFileLabel';
import styles from './ThumbnailInput.module.scss';
import { NO_IMG } from 'constants/noimg';
import SearchUnsplash from './SearchUnsplash';

interface ThumbnailInputProps {
  isSubmitting?: boolean;
  previewImg?: string | null;
  setPreviewImg?: any;
  unsplashImg?: string | null;
  setUnsplashImg?: any;
}
export default function ThumbnailInput({
  previewImg,
  isSubmitting,
  setPreviewImg,
  unsplashImg,
  setUnsplashImg,
}: ThumbnailInputProps) {
  const [viewUnsplash, setViewUnsplash] = useState<boolean>(false);

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
      setPreviewImg(result);
    };
  };

  const handleDeletePreviewImg = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPreviewImg(null);
  };

  return (
    <div className={styles.thumbnail}>
      {previewImg ? (
        <>
          <img src={previewImg} alt={'게시글 대표 썸네일'} />
          <button type="button" onClick={handleDeletePreviewImg}>
            삭제
          </button>
        </>
      ) : (
        <>
          <p>글의 대표 이미지를 설정해주세요!</p>
          <div className={styles.wrap}>
            {viewUnsplash ? (
              <>
                <SearchUnsplash
                  unsplashImg={unsplashImg}
                  setUnsplashImg={setUnsplashImg}
                />
                <button type="button" onClick={() => setViewUnsplash(false)}>
                  취소
                </button>
              </>
            ) : (
              <>
                <div className={styles.file}>
                  <label htmlFor="postThumbnail">직접올리기</label>
                  <input
                    type="file"
                    id="postThumbnail"
                    onChange={onChange}
                    disabled={isSubmitting}
                  />
                </div>
                <button
                  type="button"
                  className={styles.search}
                  onClick={() => setViewUnsplash(true)}>
                  이미지 검색
                </button>
              </>
            )}
            {/*  */}
          </div>
        </>
      )}
    </div>
  );
}
