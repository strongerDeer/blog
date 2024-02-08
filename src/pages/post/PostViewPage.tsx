import Loader from 'components/commons/loader/Loader';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { PostInterface } from 'interface';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './PostViewPage.module.scss';
import './wrap.scss';

import { Link } from 'react-router-dom';
import BtnDeletePost from 'components/commons/button/DeletePostBtn';
import useFindUser from 'hooks/useFindUser';
import { NO_IMG, NO_PROFILE } from 'constants/index';
import BackBtn from 'components/commons/button/BackBtn';
import AuthContext from 'contexts/AuthContext';
import SVGEdit from 'components/svg/SVGEdit';
import CommentContainer from 'components/comments/CommentContainer';
import classNames from 'classnames';
import TodayImage from 'components/post/TodayImage';
import LikeBtn from 'components/commons/button/LikeBtn';

export default function PostViewPage() {
  const params = useParams();

  const [post, setPost] = useState<PostInterface | null>(null);
  const { user } = useContext(AuthContext);
  const { findUser } = useFindUser(post?.uid);

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, 'posts', id);

      onSnapshot(docRef, (doc) => {
        setPost({ id: doc.id, ...(doc.data() as PostInterface) });
      });
    }
  };

  useEffect(() => {
    if (params?.id) {
      getPost(params.id);
    }
  }, [params?.id]);

  return (
    <>
      <TodayImage imgUrl={post?.imgUrl} />

      <main className={classNames('wrap', styles.post)}>
        {post ? (
          <>
            <div className={styles['post__profile-box']}>
              <p className={styles.post__author}>
                {findUser && (
                  <>
                    <img
                      src={findUser.photoURL ? findUser.photoURL : NO_PROFILE}
                      alt=""
                    />
                    {findUser.displayName}
                  </>
                )}
              </p>
              <time className={styles.post__date}>{post?.createdAt}</time>
            </div>

            <h3 className={styles.post__title}>{post?.title}</h3>
            {post?.imgUrl && (
              <img src={post?.imgUrl} alt="" className={styles.content_img} />
            )}

            <div className={styles.post__content}>{post?.content}</div>

            <p className={styles.hashtags}>
              {post?.hashTags?.map((tag, index) => (
                <span key={index} className={styles.hashtag}>
                  {tag}
                </span>
              ))}
            </p>

            <div className={styles.btnGroup}>
              <LikeBtn post={post} />
              {user?.email === post?.email && (
                <>
                  <Link
                    to={`/post/edit/${post?.id}`}
                    className={styles['post__edit']}>
                    <SVGEdit />
                    <span className="a11y-hidden">수정</span>
                  </Link>

                  <BtnDeletePost post={post} />
                </>
              )}
            </div>

            <BackBtn className="backBtn" />

            <CommentContainer post={post} />
          </>
        ) : (
          <Loader />
        )}
      </main>
    </>
  );
}
