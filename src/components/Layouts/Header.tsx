import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

// components
import Btn from 'components/commons/button/Btn';

// svg
import SVGLogo from 'components/svg/SVGLogo';
import SVGWrite from 'components/svg/SVGWrite';
import SVGSignin from 'components/svg/SVGSignin';
import SVGSignup from 'components/svg/SVGSignup';
import ProfileModal from 'components/modal/ProfileModal';
import NotificationModal from 'components/modal/NotificationModal';
import SettingModal from 'components/modal/SettingModal';

export default function Header({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
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

            <ProfileModal />

            <NotificationModal />
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

        <SettingModal />
      </nav>
    </header>
  );
}
