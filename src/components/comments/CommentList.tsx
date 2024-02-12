import { NO_PROFILE } from 'constants/index';

import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import useFindUser from 'hooks/useFindUser';
import { CommentsInterface, PostInterface } from 'interface';

import { toast } from 'react-toastify';

import styles from './CommentList.module.scss';
import { Link } from 'react-router-dom';
import getTime from 'utils/getTime';
import { getTruncate } from 'utils/getTruncate';
export default function CommentList({
  post,
  userId,
}: {
  post: PostInterface;
  userId: string;
}) {
  const hanleDeleteComment = async (comment: CommentsInterface) => {
    const confirm = window.confirm('해당 댓글을 삭제하시겠습니까?');
    if (confirm && post.id) {
      const postRef = doc(db, 'posts', post.id);
      await updateDoc(postRef, {
        comments: arrayRemove(comment),
        commentsCount: post?.commentsCount ? post?.commentsCount - 1 : 0,
      });

      // 알림 삭제
      await deleteDoc(
        doc(db, 'users', post.uid, 'notifications', comment.timeId),
      );

      toast.success('댓글이 삭제되었습니다.');
    }
  };

  return (
    <>
      {post?.comments && post?.comments.length > 0 && (
        <ol className={styles.comment_list}>
          {post?.comments
            ?.slice(0)
            .reverse()
            .map((comment: CommentsInterface, index: number) => (
              <li key={index} className={styles.comment_item}>
                <Link
                  className={styles.profile_img}
                  to={`/profile/${comment.uid}`}>
                  <img
                    src={comment?.photoURL || NO_PROFILE}
                    alt=""
                    className={styles.profile_img}
                  />
                </Link>

                <div className={styles.comment}>
                  <p className={styles.profile_info}>
                    <Link to={`/profile/${comment.uid}`}>
                      <strong>{comment?.displayName}</strong>
                      <span>{comment?.email}</span>
                    </Link>
                  </p>
                  <p>{comment.content}</p>
                  <p className={styles.comment_time}>
                    {getTime(comment.createdAt)}
                  </p>
                </div>

                {comment.uid === userId && (
                  <button
                    type="button"
                    onClick={() => hanleDeleteComment(comment)}
                    className={styles.btn_del}>
                    삭제
                  </button>
                )}
              </li>
            ))}
        </ol>
      )}
    </>
  );
}
