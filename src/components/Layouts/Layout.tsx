import { ReactNode, useContext } from 'react';
import styles from './Layout.module.scss';

import ThemeContext from 'contexts/ThemeContext';

import Header from './Header';
import Footer from './Footer';

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
