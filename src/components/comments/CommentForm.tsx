import Btn from 'components/commons/button/Btn';
import AuthContext from 'contexts/AuthContext';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { PostInterface } from 'interface';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';

export default function CommentForm({ post }: { post: PostInterface }) {
  const [comment, setComment] = useState('');
  const { user } = useContext(AuthContext);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value },
    } = e;

    setComment(value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (post.id) {
        const postRef = doc(db, 'posts', post.id);

        if (user?.uid) {
          const commentObj = {
            content: comment,
            uid: user.uid,
            createdAt: new Date()?.toLocaleDateString('ko', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          };

          await updateDoc(postRef, {
            comments: arrayUnion(commentObj),
            updateDated: new Date()?.toLocaleDateString('ko', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
            commentsCount: post?.commentsCount ? post?.commentsCount + 1 : 1,
          });
        }
      }

      toast.success('댓글을 생성하였습니다.');
      setComment('');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <textarea value={comment} onChange={onChange} required></textarea>
      <Btn type="submit" fillPrimary>
        입력
      </Btn>
    </form>
  );
}
