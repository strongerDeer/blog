import PostCardItem from './PostCardItem';

interface PostCardListProps {
  posts: any;
  getPosts: any;
}

export default function PostCardList({ posts, getPosts }: PostCardListProps) {
  return (
    <ul>
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
