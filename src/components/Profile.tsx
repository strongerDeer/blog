import { getAuth, signOut } from 'firebase/auth';
import { app } from 'firebaseApp';

import PostList from './PostList';
import { toast } from 'react-toastify';

export default function Profile() {
  const auth = getAuth(app);

  const onSignOut = async () => {
    try {
      await signOut(auth);
      toast.success('로그아웃 되었습니다!');
    } catch (error: any) {
      console.log(error);
      toast.error(error?.code);
    }
  };
  return (
    <div className="profile__section">
      <img src="" alt="" />
      <p>{auth?.currentUser?.email}</p>
      <p>{auth?.currentUser?.displayName || '사용자'}</p>
      <button onClick={onSignOut} type="button">
        로그아웃
      </button>
      <PostList hasNavigation={false} />
    </div>
  );
}
