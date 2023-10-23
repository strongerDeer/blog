import { Link } from 'react-router-dom';

type HeadertProps = {
  isAuthenticated: boolean;
};

export default function Header({ isAuthenticated }: HeadertProps) {
  return (
    <header>
      <h1>
        <Link to="/">My Blog</Link>
      </h1>

      <nav>
        {isAuthenticated ? (
          <>
            <Link to="/post/new">Write</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/post">Posts</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
}
