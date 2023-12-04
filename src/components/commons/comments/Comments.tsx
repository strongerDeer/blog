import styles from './Comments.module.scss';

import { PostInterface } from 'types/Post';
import { CommentsInterface } from 'types/Comments';

import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

interface CommentProps {
  post: PostInterface;
}

export default function Comments({ post }: CommentProps) {
  return (
    <div className={styles.commentWrap}>
      <CommentForm post={post} />

      <ol className={styles.commentList}>
        {post.comments
          ?.slice(0)
          .reverse()
          .map((comment: CommentsInterface, index: number) => (
            <CommentItem post={post} data={comment} key={index} />
          ))}
      </ol>
    </div>
  );
}
