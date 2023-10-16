export default function PostCreate() {
  return (
    <form action="/post" method="POST">
      <label htmlFor="postTitle">제목</label>
      <input type="text" id="postTitle" name="postTitle" required />

      <label htmlFor="postSummary">요약</label>
      <input type="text" id="postSummary" name="postSummary" required />

      <label htmlFor="postContent">요약</label>
      <textarea id="postContent" name="postContent" required />

      <button type="submit">제출</button>
    </form>
  );
}
