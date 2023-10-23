import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <h1>
        <Link to="/">My Blog</Link>
      </h1>

      <nav>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/post/new">Write</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/post">Posts</Link>
      </nav>
    </header>
  );
}
