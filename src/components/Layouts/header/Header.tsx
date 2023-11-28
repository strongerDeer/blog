import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

// components
import Btn from 'components/commons/button/Btn';
import SignoutBtn from 'components/commons/button/SignoutBtn';
import ThemeBtn from 'components/commons/button/ThemeBtn';

// svg
import SVGLogo from 'components/commons/SVG/SVGLogo';
import SVGWrite from 'components/commons/SVG/SVGWrite';
import SVGSignin from 'components/commons/SVG/SVGSignin';
import SVGSignup from 'components/commons/SVG/SVGSignup';
import { useContext } from 'react';
import AuthContext from 'context/AuthContext';
import { noimg } from 'utils/constants';

type HeadertProps = {
  isAuthenticated: boolean;
};

export default function Header({ isAuthenticated }: HeadertProps) {
  const { user } = useContext(AuthContext);
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
              <img
                src={user?.photoURL ? user.photoURL : noimg}
                alt="프로필 페이지"
              />
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
