import { PostInterface } from 'interface';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { useContext } from 'react';
import AuthContext from 'contexts/AuthContext';

export default function CommentContainer({ post }: { post: PostInterface }) {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h3>댓글</h3>
      <CommentForm post={post} />
      {user?.uid && <CommentList post={post} userId={user.uid} />}
    </div>
  );
}
