import Profile from 'components/profile/Profile';
import AuthContext from 'contexts/AuthContext';
import { useContext } from 'react';

export default function MyPage() {
  const { user } = useContext(AuthContext);
  return <Profile user={user} />;
}
