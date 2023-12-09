import AuthContext from 'contexts/AuthContext';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { useContext } from 'react';
import SVGLike from '../SVG/SVGLike';
import SVGLikeFill from '../SVG/SVGLikeFill';

import styles from './LikeBtn.module.scss';
export default function LikeBtn({ post }: any) {
  const { user } = useContext(AuthContext);

  const toggleLike = async () => {
    const postRef = doc(db, 'posts', post.id);

    if (user?.uid && post?.likes?.includes(user?.uid)) {
      await updateDoc(postRef, {
        likes: arrayRemove(user?.uid),
        likeCount: post?.likeCount ? post?.likeCount - 1 : 0,
      });
    } else {
      await updateDoc(postRef, {
        likes: arrayUnion(user?.uid),
        likeCount: post?.likeCount ? post?.likeCount + 1 : 1,
      });
    }
  };

  return (
    <>
      <button type="button" onClick={toggleLike} className={styles.LikeBtn}>
        {user && post?.likes?.includes(user?.uid) ? (
          <>
            <SVGLikeFill />
            <span className="a11y-hidden">좋아요 취소</span>
          </>
        ) : (
          <>
            <SVGLike />
            <span className="a11y-hidden">좋아요</span>
          </>
        )}
        {post?.likeCount}
      </button>
    </>
  );
}
