import ThemeContext from 'context/ThemeContext';
import { useContext } from 'react';

export default function BtnTheme() {
  const { theme, toggleMode } = useContext(ThemeContext);

  return (
    <button type="button" onClick={toggleMode}>
      {theme === 'light' ? '다크 모드 전환' : '라이트 모드 전환'}
    </button>
  );
}
