import Profile from 'components/profile/Profile';
import AuthContext from 'contexts/AuthContext';
import { useContext } from 'react';

export default function MyPage() {
  const { user } = useContext(AuthContext);

  if (user?.uid) {
    return <Profile user={user} userId={user.uid} />;
  } else {
    return null;
  }
}
