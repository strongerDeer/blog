import { PostInterface } from 'interface';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { useContext } from 'react';
import AuthContext from 'contexts/AuthContext';

import styles from './CommentContainer.module.scss';

export default function CommentContainer({ post }: { post: PostInterface }) {
  const { user } = useContext(AuthContext);
  return (
    <div className={styles.wrap}>
      <h3 className={styles.title}>
        댓글 <strong>{post?.commentsCount}</strong>
      </h3>
      <CommentForm post={post} />
      {user?.uid && <CommentList post={post} userId={user.uid} />}
    </div>
  );
}
