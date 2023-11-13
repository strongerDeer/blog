import { useContext } from 'react';

// firebase

import { app } from 'firebaseApp';

import AuthContext from 'context/AuthContext';
import PostList from './PostList';

import BtnLogout from './atoms/Button/SignoutBtn';

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <section className="profile__section max-width">
      <img src="" alt="" />
      <p>{user?.email}</p>
      <p>{user?.displayName || '사용자'}</p>

      <BtnLogout />
      <PostList />
    </section>
  );
}
