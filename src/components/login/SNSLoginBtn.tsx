import { app, db } from 'firebaseApp';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from 'firebase/auth';
import { toast } from 'react-toastify';

import Btn from 'components/commons/button/Btn';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function SNSLoginBtn({
  type,
  signup,
}: {
  type: string;
  signup?: boolean;
}) {
  const navigate = useNavigate();

  const onClickGoogleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    let provider;

    switch (type) {
      case 'Google':
        provider = new GoogleAuthProvider();
        break;
      case 'GitHub':
        provider = new GithubAuthProvider();
    }

    const auth = getAuth(app);

    await signInWithPopup(
      auth,
      provider as GoogleAuthProvider | GithubAuthProvider,
    )
      .then(async (res) => {
        if (signup) {
          // 유저 정보 저장
          await setDoc(doc(db, 'users', res.user.uid), {
            email: res.user.email,
            displayName: res.user.displayName,
            photoURL: res.user.photoURL,
          });
        }
        navigate('/');
        toast.success('로그인 되었습니다.');
      })
      .catch((err) => {
        console.log(err);
        const errorMsg = err?.message;
        toast.error(errorMsg);
      });
  };

  return <Btn onClick={onClickGoogleLogin}>{type} 회원가입</Btn>;
}
