import styles from './Header.module.scss';

import { Link } from 'react-router-dom';

import Btn from 'components/commons/button/Btn';
import SVGLogo from 'components/svg/SVGLogo';
import SVGSignin from 'components/svg/SVGSignin';
import SVGSignup from 'components/svg/SVGSignup';
import SVGWrite from 'components/svg/SVGWrite';
import SVGNotification from 'components/svg/SVGNotification';
import SVGSetting from 'components/svg/SVGSetting';

export default function Header() {
  // const isAuthenticated = false;
  const isAuthenticated = true;
  return (
    <header className={styles.header}>
      <h1>
        <Link to="/">
          <SVGLogo />
          <span className="a11y-hidden">My Blog</span>
        </Link>
      </h1>

      <nav>
        <Btn href="/post/create" fillPrimary>
          <SVGWrite fill="gray00" />
          Write
        </Btn>
        {isAuthenticated ? (
          <>
            {/* 로그인 */}
            <button type="button">프로필</button>

            <button type="button">
              <SVGNotification />
              <span className="a11y-hidden">알림</span>
            </button>
          </>
        ) : (
          <>
            {/* 미로그인 */}
            <Btn href="/login">
              <SVGSignin fill="primary" />
              Login
            </Btn>
            <Btn href="/signup">
              <SVGSignup />
              SignUp
            </Btn>
          </>
        )}

        <button type="button">
          <SVGSetting />
          <span className="a11y-hidden">설정</span>
        </button>
      </nav>
    </header>
  );
}
