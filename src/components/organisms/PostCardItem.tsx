import BtnDeletePost from 'components/atoms/Button/DeletePostBtn';
import AuthContext from 'context/AuthContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

interface PostCardItemProps {
  post: any;
  getPosts: any;
}

export default function PostCardItem({ post, getPosts }: PostCardItemProps) {
  const { user } = useContext(AuthContext);
  return (
    <li key={post && post?.id} className="post__box">
      <article>
        <Link to={`/post/${post?.id}`}>
          <h3 className="post__title">{post?.title}</h3>
          <div className="post__profile-box">
            <p className="post__author">
              <img src="" alt="" />
              {post?.email}
            </p>
            <time className="post__date">{post?.createAt}</time>
          </div>
          <p className="post__content">{post?.content}</p>
        </Link>

        {user?.email === post?.email && (
          <div className="post__button">
            <Link to={`/post/edit/${post?.id}`} className="post__edit">
              수정
            </Link>

            <BtnDeletePost id={post?.id} getPosts={getPosts} />
          </div>
        )}
      </article>
    </li>
  );
}
