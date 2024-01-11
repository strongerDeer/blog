import { app } from 'firebaseApp';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from 'firebase/auth';
import { toast } from 'react-toastify';

import Btn from 'components/commons/button/Btn';

export default function SNSLoginBtn({ type }: { type: string }) {
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
      .then((res) => {
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
