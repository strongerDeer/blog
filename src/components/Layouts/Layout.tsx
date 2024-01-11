import { ReactNode } from 'react';
import Header from './Header';

type LayoutProps = {
  isAuthenticated: boolean;
  children: ReactNode;
};
export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
}
