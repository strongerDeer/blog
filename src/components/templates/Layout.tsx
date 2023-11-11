import { ReactNode, useContext } from 'react';
import Footer from './Footer';
import Header from './Header';

import styles from './Layout.module.scss';
import ThemeContext from 'context/ThemeContext';

type LayoutProps = {
  isAuthenticated: boolean;
  children: ReactNode;
};
export default function Layout({ isAuthenticated, children }: LayoutProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={styles.layout} data-theme={theme}>
      <Header isAuthenticated={isAuthenticated} />
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  );
}