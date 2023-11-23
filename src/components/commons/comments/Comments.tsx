import { useContext, useState } from 'react';
import styles from './Comments.module.scss';

import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import AuthContext from 'context/AuthContext';
import { toast } from 'react-toastify';
import { PostInterface } from 'types/Post';
import { CommentsInterface } from 'types/Comments';
import TextareaLabel from '../input/TextareaLabel';
import Btn from '../button/Btn';

interface CommentProps {
  post: PostInterface;
  getPost: (id: string) => Promise<void>;
}

export default function Comments({ post, getPost }: CommentProps) {
  const [comment, setComment] = useState('');
  const { user } = useContext(AuthContext);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'comment') {
      setComment(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (post && post?.id) {
        const postRef = doc(db, 'posts', post.id);

        if (user?.uid) {
          const commentObj = {
            content: comment,
            uid: user.uid,
            email: user.email,
            createAt: new Date()?.toLocaleDateString('ko', {
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
          });
          await getPost(post.id);
        }
      }
      toast.success('댓글을 생성하였습니다.');
      setComment('');
    } catch (e: any) {
      console.log(e);
      toast.error(e?.code);
    }
  };

  const hanleDeleteComment = async (data: CommentsInterface) => {
    const confirm = window.confirm('해당 댓글을 삭제하시겠습니까?');
    if (confirm && post.id) {
      const postRef = doc(db, 'posts', post.id);
      await updateDoc(postRef, {
        comments: arrayRemove(data),
      });

      toast.success('댓글이 삭제되었습니다.');
      await getPost(post.id);
    }
  };

  return (
    <div className={styles.commentWrap}>
      <form onSubmit={onSubmit} className={styles.form}>
        <TextareaLabel
          id="comment"
          label="댓글"
          value={comment}
          onChange={onChange}
          required
        />
        <Btn type="submit">입력</Btn>
      </form>

      <ol className={styles.commentList}>
        {post.comments
          ?.slice(0)
          .reverse()
          .map((comment: CommentsInterface) => (
            <li key={comment.createAt}>
              <p>{comment.content}</p>
              <p>{comment.createAt}</p>
              <p>{comment.email}</p>
              {comment.uid === user?.uid && (
                <button
                  type="button"
                  onClick={() => hanleDeleteComment(comment)}>
                  삭제
                </button>
              )}
            </li>
          ))}
      </ol>
    </div>
  );
}
