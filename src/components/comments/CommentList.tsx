import { NO_PROFILE } from 'constants/index';

import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import useFindUser from 'hooks/useFindUser';
import { CommentsInterface, PostInterface } from 'interface';

import { toast } from 'react-toastify';

export default function CommentList({
  post,
  userId,
}: {
  post: PostInterface;
  userId: string;
}) {
  const { findUser } = useFindUser(userId);

  const hanleDeleteComment = async (comment: CommentsInterface) => {
    const confirm = window.confirm('해당 댓글을 삭제하시겠습니까?');
    if (confirm && post.id) {
      const postRef = doc(db, 'posts', post.id);
      await updateDoc(postRef, {
        comments: arrayRemove(comment),
        commentsCount: post?.commentsCount ? post?.commentsCount - 1 : 0,
      });

      toast.success('댓글이 삭제되었습니다.');
    }
  };

  return (
    <>
      {post?.comments && post?.comments.length > 0 && (
        <ol>
          {post?.comments
            ?.slice(0)
            .reverse()
            .map((comment: CommentsInterface, index: number) => (
              <li key={index}>
                <img src={findUser?.photoURL || NO_PROFILE} alt="" />
                <p>{comment.content}</p>
                <p>{comment.createdAt}</p>
                <p>{findUser?.email}</p>
                <p>{findUser?.displayName}</p>
                {comment.uid === userId && (
                  <button
                    type="button"
                    onClick={() => hanleDeleteComment(comment)}>
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
