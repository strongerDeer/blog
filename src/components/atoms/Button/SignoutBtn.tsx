// firebase
import { app } from 'firebaseApp';
import { getAuth, signOut } from 'firebase/auth';

// toast
import { toast } from 'react-toastify';

// componenets
import Btn from './Btn';
import SVGSignout from '../SVG/SVGSignout';

export default function SignoutBtn() {
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
    <Btn type="button" bgNone onClick={onSignOut}>
      <SVGSignout />
      Logout
    </Btn>
  );
}
