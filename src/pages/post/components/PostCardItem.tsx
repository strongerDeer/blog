import { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './PostCardItem.module.scss';
import AuthContext from 'context/AuthContext';
import BtnDeletePost from 'components/commons/button/DeletePostBtn';
import LikeBtn from 'components/commons/button/LikeBtn';
import Btn from 'components/commons/button/Btn';
import SVGTalk from 'components/commons/SVG/SVGTalk';
import TalkBtn from 'components/commons/button/TalkBtn';
import SVGEdit from 'components/commons/SVG/SVGEdit';
import { noimg } from 'utils/constants';

interface PostCardItemProps {
  post: any;
  getPosts: any;
}

export default function PostCardItem({ post, getPosts }: PostCardItemProps) {
  const { user } = useContext(AuthContext);
  return (
    <li key={post && post?.id}>
      <article className={styles.post}>
        <Link to={`/post/${post?.id}`}>
          <img
            src={post?.imgUrl ? post?.imgUrl : 'images/no-img.png'}
            className={styles.post_thumbnail}
          />

          <div className={styles.post_text}>
            <p className={styles.post_text_category}>{post?.category}</p>
            <h3 className={styles.post_text_title}>{post?.title}</h3>

            <div className={styles.post_text_profile}>
              <p className={styles.post_text_author}>
                <img src={user?.photoURL ? user.photoURL : noimg} alt="" />
                {user?.displayName ? user.displayName : post?.email}
              </p>
              <time className={styles.post_text_date}>
                {post?.createAt.split('. 오')[0]}
              </time>
            </div>
            <p className={styles.post_text_content}>{post?.content}</p>
          </div>
        </Link>
        <div className={styles['post__button']}>
          <div className={styles.default__button}>
            <LikeBtn post={post} />
            <TalkBtn href={`/post/${post?.id}`} />
          </div>
          {user?.email === post?.email && (
            <div>
              <Link
                to={`/post/edit/${post?.id}`}
                className={styles['post__edit']}>
                <SVGEdit /> 수정
              </Link>

              <BtnDeletePost
                id={post?.id}
                imgUrl={post?.imgUrl}
                getPosts={getPosts}
              />
            </div>
          )}
        </div>
      </article>
    </li>
  );
}
