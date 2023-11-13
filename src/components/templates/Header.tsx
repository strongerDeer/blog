import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

// components
import Btn from 'components/atoms/Button/Btn';
import SignoutBtn from 'components/atoms/Button/SignoutBtn';
import ThemeBtn from 'components/atoms/Button/ThemeBtn';

// svg
import SVGLogo from 'components/atoms/SVG/SVGLogo';
import SVGWrite from 'components/atoms/SVG/SVGWrite';
import SVGSignin from 'components/atoms/SVG/SVGSignin';
import SVGSignup from 'components/atoms/SVG/SVGSignup';

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

            <SignoutBtn />
          </>
        ) : (
          <>
            <Btn href="/login" bgNone>
              <SVGSignin />
              Signin
            </Btn>
            <Btn href="/signup" bgNone>
              <SVGSignup />
              Signup
            </Btn>
          </>
        )}

        <ThemeBtn />
      </div>
    </header>
  );
}
