import axios from 'axios';
import { useState } from 'react';

import styles from './SearchUnsplash.module.scss';

interface UnsplashImages {
  total: number;
  results: UnsplashImage[];
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
}

export default function SearchUnsplash({
  unsplashImg,
  setUnsplashImg,
}: SearchUnsplashProps) {
  const [keyword, setKeyword] = useState<string>('');
  const [unsplashImages, setUnsplashImages] = useState<UnsplashImages | null>(
    null,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSearch = async () => {
    setUnsplashImg?.(null);
    try {
      const res = await axios.get<UnsplashImages>(
        `https://api.unsplash.com/search/photos?query=${keyword}`,
        {
          params: {
            client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
          },
        },
      );

      setUnsplashImages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <input type="search" value={keyword} onChange={handleChange} />
      <button type="button" onClick={handleSearch}>
        검색
      </button>

      {unsplashImg ? (
        <img src={unsplashImg} alt="" className={styles.select__img} />
      ) : (
        <>
          {unsplashImages && unsplashImages.total > 0 && (
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
          )}
        </>
      )}
    </>
  );
}
