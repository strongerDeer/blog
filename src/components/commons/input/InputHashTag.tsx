import { useState } from 'react';
import InputTextLabel from './InputTextLabel';
import { toast } from 'react-toastify';

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
    <>
      <p>
        {tags?.map((tag, index) => (
          <span key={index}>
            #{tag}
            <button type="button" onClick={() => removeTag(tag)}>
              삭제
            </button>
          </span>
        ))}
      </p>
      <InputTextLabel
        label="해시태그"
        id="postHashtag"
        placeholder="해시태그 + 스페이스바 입력"
        onChange={onChangeHashtag}
        onKeyUp={handleKeyUp}
        value={hashtag}
      />
    </>
  );
}
