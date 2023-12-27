import axios from 'axios';
import { useEffect, useState } from 'react';

export interface UnsplashImage {
  urls: {
    small: string;
  };
}

export default function useSearchUnsplash(keyword: string): UnsplashImage[] {
  const [unsplash, setUnsplash] = useState<UnsplashImage[]>([]);

  useEffect(() => {
    const fetchUnsplashImages = async () => {
      try {
        const res = await axios.get(
          `https://api.unsplash.com/photos/${keyword}`,
          {
            params: {
              client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
            },
          },
        );

        setUnsplash(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUnsplashImages();
  }, []);

  return unsplash;
}
