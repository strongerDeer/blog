import { ReactNode, useContext } from 'react';
import styles from './Layout.module.scss';

import ThemeContext from 'contexts/ThemeContext';

import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }: { children: ReactNode }) {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={styles.layout} data-theme={theme}>
      <Header />
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  );
}
