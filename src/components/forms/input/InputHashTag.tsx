import { useState } from 'react';
import styles from './InputHashTag.module.scss';
import { toast } from 'react-toastify';
import SVGDelete from 'components/svg/SVGDelete';
import { Dispatch } from '@toast-ui/editor';

export default function InputHashTag({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  // const [tags, setTags] = useState<string[]>([]);
  const [hashtag, setHashtag] = useState<string>('');

  const onChangeHashtag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim().replace(',', '');
    setHashtag(value);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputHashtag = e.currentTarget.value?.trim();

    if (
      (e.key === 'Enter' || e.key === ' ' || e.key === ',') &&
      inputHashtag !== ''
    ) {
      if (tags?.includes(inputHashtag)) {
        // 중복 태그 체크
        toast.error('같은 태그가 있습니다!');
        setHashtag('');
      } else {
        setTags((prev: string[]) => [...prev, inputHashtag]);
        setHashtag('');
      }
    }
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev?.filter((val) => val !== tag));
  };

  return (
    <div className={styles.hash}>
      <label htmlFor="postHashtag">
        해시태그 (쉼표, 스페이스, 엔터로 추가 / 최대 10개)
      </label>
      <div className={styles.hash__box}>
        <p className={styles.hash__tags}>
          {tags?.map((tag, index) => (
            <span key={index} className={styles.hash__tag}>
              {tag}
              <button
                type="button"
                className={styles['hash-del']}
                onClick={() => removeTag(tag)}>
                <SVGDelete fill="black" />
                <span className="a11y-hidden">삭제</span>
              </button>
            </span>
          ))}
        </p>

        {tags.length < 10 && (
          <input
            type="text"
            id="postHashtag"
            name="postHashtag"
            onChange={onChangeHashtag}
            onKeyUp={handleKeyUp}
            value={hashtag}
            maxLength={20}
            placeholder="최대 20자"
          />
        )}
        <p>
          <strong>{tags.length}</strong>/10
        </p>
      </div>
    </div>
  );
}
