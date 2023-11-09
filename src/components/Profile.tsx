import { useContext } from 'react';

// firebase
import { getAuth, signOut } from 'firebase/auth';
import { app } from 'firebaseApp';

import { toast } from 'react-toastify';
import AuthContext from 'context/AuthContext';
import PostList from './PostList';
import PostCardList from './organisms/PostCardList';

export default function Profile() {
  const { user } = useContext(AuthContext);

  const onSignOut = async () => {
    try {
      const auth = getAuth(app);
      await signOut(auth);
      toast.success('로그아웃 되었습니다!');
    } catch (error: any) {
      console.log(error);
      toast.error(error?.code);
    }
  };
  return (
    <section className="profile__section max-width">
      <img src="" alt="" />
      <p>{user?.email}</p>
      <p>{user?.displayName || '사용자'}</p>
      <button onClick={onSignOut} type="button">
        로그아웃
      </button>
      <PostList />
    </section>
  );
}
