import PostCardItem from './PostCardItem';
import styles from './PostCardList.module.scss';
interface PostCardListProps {
  posts: any;
  getPosts: any;
}

export default function PostCardList({ posts, getPosts }: PostCardListProps) {
  return (
    <ul className={styles.post__list}>
      {posts?.length > 0 ? (
        posts.map((post: any) => (
          <PostCardItem key={post.id} post={post} getPosts={getPosts} />
        ))
      ) : (
        <p>게시글이 없습니다.</p>
      )}
    </ul>
  );
}
