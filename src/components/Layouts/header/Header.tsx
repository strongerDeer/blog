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
import AuthContext from 'contexts/AuthContext';
import { useRecoilState } from 'recoil';

import useTranslation from 'hooks/useTranslation';
import { languageState } from 'recoils/atom';
import { NO_IMG } from 'constants/noimg';

type HeadertProps = {
  isAuthenticated: boolean;
};

export default function Header({ isAuthenticated }: HeadertProps) {
  const { user } = useContext(AuthContext);
  const [language, setLanguage] = useRecoilState(languageState);
  const translation = useTranslation();

  const changeLanguage = () => {
    setLanguage((language) => (language === 'ko' ? 'en' : 'ko'));
    localStorage.setItem('language', language === 'ko' ? 'en' : 'ko');
  };

  return (
    <header className={styles.header}>
      <h1>
        <Link to="/">
          <SVGLogo />
          <span className="a11y-hidden">My Blog</span>
        </Link>
      </h1>

      <nav>
        <Link to="/post">{translation('MENU_POST')}</Link>
        <Link to="/followingpost">팔로우중인 게시글(홈)</Link>
      </nav>

      <div className={styles.btnGroup}>
        <Btn bgNone onClick={changeLanguage}>
          {language}
        </Btn>
        {isAuthenticated ? (
          <>
            <Link to="/profile" className={styles.profile}>
              <img
                src={user?.photoURL ? user.photoURL : NO_IMG}
                alt="프로필 페이지"
              />
            </Link>

            <Btn href="/post/new">
              <SVGWrite fill="#fff" />
              Write
            </Btn>

            <Btn href="/notifications" bgNone>
              알림
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
