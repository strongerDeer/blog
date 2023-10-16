export default function PostDetail() {
  return (
    <main className="post__detail">
      <h3 className="post__title">게시글</h3>

      <div className="post__profile-box">
        <p className="post__author">
          <img src="" alt="" />
          stronger.Deer
        </p>
        <time className="post__datte">2023.10.16 토요일</time>
      </div>
      <p className="post__content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
        necessitatibus quod repudiandae autem illum! Doloribus eum consectetur a
        eaque reprehenderit! Atque officia inventore natus temporibus dolorem
        delectus ea! Eaque, magni?
      </p>

      <div className="post__button">
        <button type="button" className="post__edit">
          수정
        </button>
        <button type="button" className="post__delete">
          삭제
        </button>
      </div>
    </main>
  );
}
