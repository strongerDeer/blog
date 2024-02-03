import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <>
      <Link to="/post">게시글</Link>
      <Link to="/follwers">팔로워</Link>
      <Link to="/follwings">팔로잉</Link>
    </>
  );
}
