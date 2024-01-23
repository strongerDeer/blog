import Btn from 'components/commons/button/Btn';
import InputHashTag from 'components/forms/input/InputHashTag';
import InputTextLabel from 'components/forms/input/InputTextLabel';
import SVGWrite from 'components/svg/SVGWrite';
import { useState } from 'react';

import styles from './PostCreatePage.module.scss';
import InputThumbnailImg from 'components/forms/input/InputThumbnailImg';
export default function PostCreatePage({ post }: any) {
  const [previewImg, setPreviewImg] = useState<string>('');

  return (
    <div className={styles.wrap}>
      {/* 오늘 날짜 */}
      <InputThumbnailImg
        label="썸네일 이미지"
        id="post-thumbnail"
        value={previewImg}
        setValue={setPreviewImg}
      />

      <form className={styles.form}>
        {/* 카테고리 */}

        <div>
          <InputTextLabel label="제목" id="postTitle" maxLength={50} required />
        </div>

        <textarea>내용삽입-에디터사용</textarea>

        <InputHashTag />

        <div className={styles.btnGroup}>
          {/* 
          <Btn></Btn>
          <Btn>삭제</Btn> */}
          <Btn>취소</Btn>
          <Btn fillPrimary>
            <SVGWrite />
            {post ? '수정' : '제출'}
          </Btn>
        </div>
        <Btn>뒤로가기</Btn>
      </form>
    </div>
  );
}
