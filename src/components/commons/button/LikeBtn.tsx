import AuthContext from 'context/AuthContext';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { useContext } from 'react';

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
      <button type="button" onClick={toggleLike}>
        {user && post?.likes?.includes(user?.uid) ? '좋아요 취소' : '좋아요'}
      </button>
      {post?.likeCount}
    </>
  );
}
