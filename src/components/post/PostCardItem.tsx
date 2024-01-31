import { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './PostCardItem.module.scss';
import AuthContext from 'contexts/AuthContext';
import SVGEdit from 'components/svg/SVGEdit';

interface PostCardItemProps {
  post: any;
}

export default function PostCardItem({ post }: PostCardItemProps) {
  const { user } = useContext(AuthContext);
  // const { findUser } = useFindUser(post?.uid ? post.uid : '');
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
                {/* <img src={findUser?.photoURL || NO_IMG} alt="" /> */}
                {/* {findUser?.displayName || post?.email} */}
              </p>

              <time className={styles.post_text_date}>
                {/* {getTime(post?.createdAt)} */}
              </time>
            </div>
            <p className={styles.post_text_content}>{post?.content}</p>
          </div>
        </Link>
        <div className={styles['post__button']}>
          <div className={styles.default__button}>
            {/* <LikeBtn post={post} /> */}
            {/* <TalkBtn count={post?.commentsCount} href={`/post/${post?.id}`} /> */}
          </div>
          {user?.email === post?.email && (
            <div className={styles.btnGroup}>
              <Link
                to={`/post/edit/${post?.id}`}
                className={styles['post__edit']}>
                <SVGEdit />
                <span className="a11y-hidden">수정</span>
              </Link>

              {/* <BtnDeletePost post={post} /> */}
            </div>
          )}
        </div>
      </article>
    </li>
  );
}
