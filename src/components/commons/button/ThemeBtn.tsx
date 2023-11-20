import ThemeContext from 'context/ThemeContext';
import { useContext } from 'react';

import SVGThemeLight from '../SVG/SVGThemeLight';
import SVGThemeDark from '../SVG/SVGThemeDark';

import styles from './ThemeBtn.module.scss';

export default function ThemeBtn() {
  const { theme, toggleMode } = useContext(ThemeContext);

  return (
    <button type="button" onClick={toggleMode} className={styles.btnTheme}>
      {theme === 'light' ? (
        <>
          <SVGThemeLight />
          <span className="a11y-hidden"> 다크 모드 전환</span>
        </>
      ) : (
        <>
          <SVGThemeDark fill="#fff" />
          <span className="a11y-hidden">라이트 모드 전환</span>
        </>
      )}
    </button>
  );
}
