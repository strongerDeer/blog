import Btn from 'components/commons/button/Btn';
import InputHashTag from 'components/forms/input/InputHashTag';
import InputTextLabel from 'components/forms/input/InputTextLabel';
import SVGWrite from 'components/svg/SVGWrite';

export default function PostCreatePage({ post }: any) {
  return (
    <>
      <p>오늘 날짜</p>

      <form>
        <p>카테고리</p>
        <InputTextLabel label="제목" id="postTitle" maxLength={50} required />
        <p>썸네일 삽입</p>
        <textarea>내용삽입-에디터사용</textarea>

        <InputHashTag />

        <div>
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
    </>
  );
}
