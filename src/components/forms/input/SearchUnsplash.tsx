import { useEffect, useState } from 'react';

import axios from 'axios';

import styles from './SearchUnsplash.module.scss';

interface UnsplashImages {
  total?: number;
  total_pages?: number;
  results?: UnsplashImage[];
}

interface UnsplashImage {
  id: string;
  urls: {
    small: string;
  };
}

interface SearchUnsplashProps {
  unsplashImg?: string | null;
  setUnsplashImg?: React.Dispatch<React.SetStateAction<string | null>>;
  setViewUnsplash: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchUnsplash({
  unsplashImg,
  setUnsplashImg,
  setViewUnsplash,
}: SearchUnsplashProps) {
  const [keyword, setKeyword] = useState<string>('');
  const [unsplashImages, setUnsplashImages] = useState<UnsplashImages>({});
  const [pageNum, setPageNum] = useState<number>(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPageNum(1);
    setUnsplashImg?.(null);

    getData();
  };

  const getData = async () => {
    try {
      const res = await axios.get<UnsplashImages>(
        `https://api.unsplash.com/search/photos?query=${keyword}`,
        {
          params: {
            client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
            per_page: 12,
            page: pageNum,
            order_by: 'popular',
          },
        },
      );

      setUnsplashImages(res.data);
    } catch (error) {
      console.log(error);
      setUnsplashImages({ total: 0 });
    }
  };

  useEffect(() => {
    if (unsplashImages.total) {
      getData();
    }
  }, [pageNum]);

  return (
    <>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <label htmlFor="search-unsplash" className="a11y-hidden">
          이미지 검색어
        </label>
        <input
          id="search-unsplash"
          type="search"
          value={keyword}
          onChange={handleChange}
        />

        <button type="submit">검색</button>
      </form>
      <button
        type="button"
        onClick={() => setViewUnsplash(false)}
        className={styles.btnCancel}>
        취소
      </button>

      {unsplashImg ? (
        <img src={unsplashImg} alt="" className={styles.select__img} />
      ) : (
        <div>
          {unsplashImages?.total === 0 ? (
            <p>이미지를 찾을 수 없습니다.</p>
          ) : (
            unsplashImages?.results &&
            unsplashImages?.total &&
            unsplashImages?.total_pages && (
              <div>
                <p>
                  <strong>{keyword}</strong>: {unsplashImages?.total} 개
                </p>
                <ul className={styles.unsplash_list}>
                  {unsplashImages.results.map((img) => (
                    <li key={img.id}>
                      <button
                        type="button"
                        onClick={() => setUnsplashImg?.(img.urls.small)}>
                        <img src={img.urls.small} alt="" />
                      </button>
                    </li>
                  ))}
                </ul>
                {unsplashImages.total % 10 === unsplashImages?.total_pages ? (
                  <>ddd</>
                ) : (
                  <>???</>
                )}

                <button
                  type="button"
                  onClick={() =>
                    setPageNum((prev) => (prev > 1 ? prev - 1 : 1))
                  }
                  disabled={pageNum === 1}>
                  이전
                </button>
                <button
                  type="button"
                  onClick={() => setPageNum((prev) => prev + 1)}
                  disabled={pageNum === unsplashImages.total_pages}>
                  다음
                </button>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
}
