import { useContext } from 'react';

// firebase
import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';

// lib
import { toast } from 'react-toastify';

// utils
import AuthContext from 'context/AuthContext';

// types
import { PostInterface } from 'types/Post';
import { CommentsInterface } from 'types/Comments';

interface CommentItemProps {
  post: PostInterface;
  data: CommentsInterface;
}

export default function CommentItem({ post, data }: CommentItemProps) {
  const { user } = useContext(AuthContext);
  const hanleDeleteComment = async (data: CommentsInterface) => {
    const confirm = window.confirm('해당 댓글을 삭제하시겠습니까?');
    if (confirm && post.id) {
      const postRef = doc(db, 'posts', post.id);
      await updateDoc(postRef, {
        comments: arrayRemove(data),
        commentsCount: post?.commentsCount ? post?.commentsCount - 1 : 0,
      });
      toast.success('댓글이 삭제되었습니다.');
    }
  };

  return (
    <li>
      <img src={data.profileURL} alt="" />
      <p>{data.content}</p>
      <p>{data.createdAt}</p>
      <p>{data.email}</p>
      <p>{data.nickname}</p>
      {data.uid === user?.uid && (
        <button type="button" onClick={() => hanleDeleteComment(data)}>
          삭제
        </button>
      )}
    </li>
  );
}
