import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

type LayoutProps = {
  isAuthenticated: boolean;
  children: ReactNode;
};
export default function Layout({ isAuthenticated, children }: LayoutProps) {
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      {children}
      <Footer />
    </>
  );
}
