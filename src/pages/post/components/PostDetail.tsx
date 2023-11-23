import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import styles from './PostDetail.module.scss';

// firebase
import { doc, getDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';

import BtnDeletePost from '../../../components/commons/button/DeletePostBtn';
import Loader from '../../../components/commons/loader/Loader';

import Comments from '../../../components/commons/comments/Comments';
import { PostInterface } from 'types/Post';
import Today from './Today';
import classNames from 'classnames';

export default function PostDetail() {
  const [post, setPost] = useState<PostInterface | null>(null);
  const params = useParams();

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);

      setPost({ id: docSnap.id, ...(docSnap.data() as PostInterface) });
    }
  };

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, [params?.id]);

  return (
    <>
      <Today />
      <main className={classNames('container', styles.post)}>
        {post ? (
          <>
            <div className={styles['post__profile-box']}>
              <p className={styles.post__author}>
                <img src="" alt="" />
                stronger.Deer
              </p>
              <time className={styles.post__date}>{post?.createAt}</time>
            </div>

            {post?.category && (
              <p className={styles.post__category}>{post?.category}</p>
            )}

            <h3 className={styles.post__title}>{post?.title}</h3>

            {post?.imgUrl && (
              <img src={post?.imgUrl} alt="" className="post__img" />
            )}

            <div className={styles.post__content}>{post?.content}</div>

            <div className="post__button">
              <Link to={`/post/edit/${params?.id}`} className="post__edit">
                수정
              </Link>
              <BtnDeletePost id={params?.id} imgUrl={post?.imgUrl} />
            </div>

            <Comments post={post} getPost={getPost} />
          </>
        ) : (
          <Loader />
        )}
      </main>
    </>
  );
}
