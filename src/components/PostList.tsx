import { Link } from 'react-router-dom';
interface PostListProps {
  hasNavigation?: boolean;
}
export default function PostList({ hasNavigation = true }: PostListProps) {
  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <button type="button" className="post__navigation--active">
            전체
          </button>
          <button type="button">나의 글</button>
        </div>
      )}
      <ul className="post__list">
        {[...Array(10)].map((e, index) => (
          <li key={index} className="post__box">
            <article>
              <Link to={`/post/${index}`}>
                <h3 className="post__title">게시글 {index}</h3>

                <div className="post__profile-box">
                  <p className="post__author">
                    <img src="" alt="" />
                    stronger.Deer
                  </p>
                  <time className="post__datte">2023.10.16 토요일</time>
                </div>
                <p className="post__content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
                  necessitatibus quod repudiandae autem illum! Doloribus eum
                  consectetur a eaque reprehenderit! Atque officia inventore
                  natus temporibus dolorem delectus ea! Eaque, magni?
                </p>
              </Link>
              <div className="post__button">
                <button type="button" className="post__edit">
                  수정
                </button>
                <button type="button" className="post__delete">
                  삭제
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
