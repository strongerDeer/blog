import styles from './Header.module.scss';

import { Link } from 'react-router-dom';

import Btn from 'components/commons/button/Btn';
import SVGLogo from 'components/svg/SVGLogo';
import SVGSignin from 'components/svg/SVGSignin';
import SVGSignup from 'components/svg/SVGSignup';
import SVGWrite from 'components/svg/SVGWrite';
import ProfileBtn from 'components/profile/ProfileBtn';
import NotificationBtn from 'components/notification/NotificationBtn';
import SettingBtn from 'components/setting/SettingBtn';

export default function Header() {
  const isAuthenticated = false;
  // const isAuthenticated = true;
  return (
    <header className={styles.header}>
      <h1>
        <Link to="/">
          <SVGLogo />
          <span className="a11y-hidden">My Blog</span>
        </Link>
      </h1>

      <nav>
        {isAuthenticated ? (
          <>
            {/* 로그인 */}
            <Btn href="/post/create" className={styles.write_btn} fillPrimary>
              <SVGWrite fill="gray00" />
              Write
            </Btn>
            <ProfileBtn />
            <NotificationBtn />
          </>
        ) : (
          <>
            {/* 미로그인 */}
            <Btn href="/login">
              <SVGSignin fill="primary" />
              Login
            </Btn>
            <Btn href="/signup" fillPrimary>
              <SVGSignup fill="gray00" />
              Signup
            </Btn>
          </>
        )}

        <SettingBtn />
      </nav>
    </header>
  );
}
