import { useContext } from 'react';

// firebase
import AuthContext from 'context/AuthContext';

import BtnLogout from '../../../components/commons/button/SignoutBtn';
import PostList from '../../post/components/PostList';
import Btn from 'components/commons/button/Btn';

interface ProfileProps {
  image?: string;
  nickname?: string;
  email?: string;
  createAt?: string;
  uid?: string;
  id?: string;
}
export default function Profile() {
  const { user } = useContext(AuthContext);
  const loginProvider = user?.providerData[0].providerId;

  return (
    <section className="profile__section">
      <img src={user?.photoURL ? user.photoURL : ''} alt="" />
      <p>{user?.email}</p>
      <p>{user?.displayName}</p>

      <BtnLogout />

      {/* {!(loginProvider === 'google.com' || loginProvider === 'github.com') && (
        <Btn href="/profile/edit">프로필 수정</Btn>
      )} */}

      <Btn href="/profile/edit">프로필 수정</Btn>
      <PostList />
    </section>
  );
}
