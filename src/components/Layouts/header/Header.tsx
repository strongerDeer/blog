import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

// components
import Btn from 'components/commons/button/Btn';

// svg
import SVGLogo from 'components/commons/SVG/SVGLogo';
import SVGWrite from 'components/commons/SVG/SVGWrite';
import SVGSignin from 'components/commons/SVG/SVGSignin';
import SVGSignup from 'components/commons/SVG/SVGSignup';

import SettingModal from '../modal/SettingModal';
import ProfileModal from '../modal/ProfileModal';
import NotificationModal from '../modal/NotificationModal';

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

      <div className={styles.btnGroup}>
        {isAuthenticated ? (
          <>
            <Btn href="/post/new">
              <SVGWrite fill="#fff" />
              Write
            </Btn>
            <ProfileModal />

            <NotificationModal />
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

        <SettingModal />
      </div>
    </header>
  );
}
