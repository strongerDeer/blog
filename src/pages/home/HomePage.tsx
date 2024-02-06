import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <>
      <Link to="/post">게시글</Link>
      <Link to="/followers">팔로워</Link>
      <Link to="/followings">팔로잉</Link>
    </>
  );
}
