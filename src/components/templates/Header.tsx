import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import BtnTheme from 'components/atoms/BtnTheme';
import SVGLogo from 'components/atoms/SVG/SVGLogo';

import Btn from 'components/atoms/Btn';
import SVGWrite from 'components/atoms/SVG/SVGWrite';
import SVGLogout from 'components/atoms/SVG/SVGLogout';

type HeadertProps = {
  isAuthenticated: boolean;
};

export default function Header({ isAuthenticated }: HeadertProps) {
  return (
    <header className={styles.header}>
      <h1>
        <Link to="/">
          <SVGLogo />
          <span className="a11y-hidden">My Blog</span>
        </Link>
      </h1>

      <nav>
        <Link to="/post">Posts</Link>
      </nav>

      <div className={styles.btnGroup}>
        {isAuthenticated ? (
          <>
            <Link to="/profile" className={styles.profile}>
              <img src="/images/profile.png" alt="프로필 페이지" />
            </Link>

            <Btn href="/post/new">
              <SVGWrite fill="#fff" />
              Write
            </Btn>
            <Btn type="button" bgNone>
              <SVGLogout />
              Logout
            </Btn>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}

        <BtnTheme />
      </div>
    </header>
  );
}
