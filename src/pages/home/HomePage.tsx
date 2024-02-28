import PostList from "components/post/PostList";

export default function HomePage() {
  return (
    <div className="max-width">
      <h2>배너</h2>

      <h2>인기게시글</h2>
      <PostList />

      <h2>내가 팔로우 중인 게시글</h2>
    </div>
  );
}
