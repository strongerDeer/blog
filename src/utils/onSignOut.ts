import { getAuth, signOut } from 'firebase/auth';
import { app } from 'firebaseApp';
import { toast } from 'react-toastify';

export const onSignOut = async () => {
  const confirm = window.confirm('로그아웃 하시겠습니까?');

  if (confirm) {
    try {
      const auth = getAuth(app);
      await signOut(auth);
      toast.success('로그아웃 되었습니다!');
    } catch (error: any) {
      console.log(error);
      toast.error(error?.code);
    }
  }
};
