import PostList from 'components/PostList';

export default function PostListPage() {
  return (
    <div className="max-width">
      <h1>Post List Page</h1>
      <PostList defaultTab="my" />
    </div>
  );
}
