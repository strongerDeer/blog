import styles from './Comments.module.scss';

import TextareaLabel from '../input/TextareaLabel';
import { useContext, useState } from 'react';
import AuthContext from 'contexts/AuthContext';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'firebaseApp';
import { toast } from 'react-toastify';
import Btn from '../button/Btn';
import { PostInterface } from 'types/Post';

export interface CommentProps {
  post: PostInterface | null;
}

export default function CommentForm({ post }: CommentProps) {
  const [comment, setComment] = useState('');
  const { user } = useContext(AuthContext);

  const truncate = (str: string, num: number = 10) => {
    return str?.length > num ? str.substring(0, num) + '...' : str;
  };

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
      if (post && post.id && user) {
        const postRef = doc(db, 'posts', post.id);

        if (user?.uid) {
          const commentObj = {
            content: comment,
            uid: user.uid,
            email: user.email,
            profileURL: user.photoURL,
            nickname: user?.displayName,
            createdAt: new Date()?.toLocaleDateString('ko', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
            commentsCount: post?.commentsCount ? post?.commentsCount + 1 : 1,
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

      // 댓글 생성 알림 만들기
      if (user?.uid !== post?.uid) {
        await addDoc(collection(db, 'notifications'), {
          createdAt: new Date()?.toLocaleDateString('ko', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
          uid: post?.uid,
          isRead: false,
          url: `/post/${post?.id}`,
          type: 'comment',
          author: user?.displayName,
          post: post?.title && truncate(post?.title),
          content: truncate(comment, 16),
        });
      }
      toast.success('댓글을 생성하였습니다.');
      setComment('');
    } catch (e: any) {
      console.log(e);
      toast.error(e?.code);
    }
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <TextareaLabel
        id="comment"
        label="댓글"
        value={comment}
        onChange={onChange}
        required
      />
      <Btn type="submit" disabled={!comment}>
        입력
      </Btn>
    </form>
  );
}
