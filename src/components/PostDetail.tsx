import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// firebase
import { doc, getDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';

import BtnDeletePost from './atoms/Button/DeletePostBtn';
import Loader from './molecules/Loader';
import { PostProps } from './PostList';
import Comments from './organisms/Comments';

export default function PostDetail() {
  const [post, setPost] = useState<PostProps | null>(null);
  const params = useParams();

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);

      setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
    }
  };

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, [params?.id]);

  return (
    <main className="post__detail">
      {post ? (
        <>
          <h3 className="post__title">{post?.title}</h3>

          <div className="post__profile-box">
            <p className="post__author">
              <img src="" alt="" />
              stronger.Deer
            </p>
            <time className="post__datte">{post?.createAt}</time>
          </div>
          <p className="post__content">{post?.content}</p>
          {post?.category && <p className="post__category">{post?.category}</p>}
          {post?.imgUrl && (
            <img src={post?.imgUrl} alt="" className="post__img" />
          )}
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
  );
}
