import 'styles/reset.scss';
import 'styles/global.scss';

import { useEffect, useState } from 'react';

// toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// firebase
import { app } from 'firebaseApp';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// components
import Layout from 'components/Layouts/Layout';
import Router from 'router/Router';
import Loader from 'components/commons/loader/Loader';
import { RecoilRoot } from 'recoil';

function App() {
  const auth = getAuth(app);
  // auth를 체크하기 전(초기화 전) loader를 띄워주는 용도
  const [init, setInit] = useState<boolean>(false);

  // auth의 currentUser가 있으면 Authenticated로 변경
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser,
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);

  return (
    <RecoilRoot>
      <ToastContainer />
      <Layout isAuthenticated={isAuthenticated}>
        {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
      </Layout>
    </RecoilRoot>
  );
}

export default App;
