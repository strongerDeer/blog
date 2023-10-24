import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

import styles from './Layout.module.scss';

type LayoutProps = {
  isAuthenticated: boolean;
  children: ReactNode;
};
export default function Layout({ isAuthenticated, children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <Header isAuthenticated={isAuthenticated} />
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  );
}
