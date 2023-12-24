import { useState } from 'react';
import { toast } from 'react-toastify';

import styles from './InputHashTag.module.scss';
import SVGDelete from '../SVG/SVGDelete';

interface InputHashTagProps {
  tags?: string[];
  setTags?: React.Dispatch<React.SetStateAction<string[]>>;
}
export default function InputHashTag({ tags, setTags }: InputHashTagProps) {
  const [hashtag, setHashtag] = useState<string>('');

  const onChangeHashtag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashtag(e?.target?.value?.trim());
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputHashtag = e.currentTarget.value?.trim();
    if (e.key === ' ' && inputHashtag !== '') {
      if (tags?.includes(inputHashtag)) {
        // 중복 태그 체크
        toast.error('같은 태그가 있습니다!');
        setHashtag('');
      } else {
        setTags?.((prev: string[]) => [...prev, inputHashtag]);
        setHashtag('');
      }
    }
  };

  const removeTag = (tag: string) => {
    setTags?.((prev) => prev?.filter((val) => val !== tag));
  };

  return (
    <div className={styles.hash}>
      <label htmlFor="postHashtag">
        해시태그 (해시태그 + 스페이스바 입력 / 최대 10개)
      </label>
      <div className={styles.hashWrap}>
        <p className={styles.hashtags}>
          {tags?.map((tag, index) => (
            <span key={index} className={styles.hashtag}>
              {tag}
              <button
                type="button"
                className={styles.hash_del}
                onClick={() => removeTag(tag)}>
                <SVGDelete fill="black" />
                <span className="a11y-hidden">삭제</span>
              </button>
            </span>
          ))}
        </p>

        {tags && tags?.length < 10 && (
          <>
            <input
              className={styles.input}
              type="text"
              id="postHashtag"
              name="postHashtag"
              onChange={onChangeHashtag}
              onKeyUp={handleKeyUp}
              value={hashtag}
            />
          </>
        )}
      </div>
    </div>
  );
}
