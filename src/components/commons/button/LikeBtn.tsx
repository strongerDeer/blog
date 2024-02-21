import AuthContext from 'contexts/AuthContext';
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'firebaseApp';
import { useContext, useEffect, useState } from 'react';

import styles from './LikeBtn.module.scss';
import SVGLikeFill from 'components/svg/SVGLikeFill';
import SVGLike from 'components/svg/SVGLike';
import { getTruncate } from 'utils/getTruncate';

export default function LikeBtn({ post }: any) {
  const { user } = useContext(AuthContext);

  const [likes, setLikes] = useState<string[]>([]);

  useEffect(() => {
    let likeRef = collection(db, `posts/${post.id}/likes`);
    let likeQuery = query(likeRef);

    onSnapshot(likeQuery, (snapshot) => {
      let dataObj = snapshot.docs.map((doc) => doc?.id);
      setLikes(dataObj as string[]);
    });
  }, []);

  const toggleLike = async () => {
    if (user?.uid) {
      if (!likes.includes(user.uid)) {
        // 좋아요!
        await setDoc(doc(db, `posts/${post.id}`, `likes/${user?.uid}`), {});

        await updateDoc(doc(db, `posts/${post.id}`), {
          likeCount: post?.likeCount ? post?.likeCount + 1 : 1,
        });

        // 알림 추가
        await setDoc(
          doc(db, `users/${post.uid}`, `notifications/${user?.uid}`),
          {
            createdAt: new Date()?.toLocaleDateString('ko', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
            uid: post?.uid,
            isRead: false,
            url: `/post/${post?.id}`,
            type: 'like',
            author: user?.uid,
            postTitle: getTruncate(post?.content),
          },
        );
      } else {
        // 좋아요 취소
        await deleteDoc(doc(db, `posts/${post.id}`, `likes/${user?.uid}`));
        await updateDoc(doc(db, `posts/${post.id}`), {
          likeCount: post?.likeCount ? post?.likeCount - 1 : 0,
        });

        // 알림 삭제
        await deleteDoc(
          doc(db, `users/${post.uid}`, `notifications/${user?.uid}`),
        );
      }
    }
  };

  return (
    <>
      <button type="button" onClick={toggleLike} className={styles.LikeBtn}>
        {user?.uid && likes.includes(user.uid) ? (
          <>
            <SVGLikeFill fill="statusWarn" />
            <span className="a11y-hidden">좋아요 취소</span>
          </>
        ) : (
          <>
            <SVGLike />
            <span className="a11y-hidden">좋아요</span>
          </>
        )}
        {post.likeCount ? post.likeCount : 0}
      </button>
    </>
  );
}
