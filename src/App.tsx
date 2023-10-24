import 'styles/reset.scss';

import { useEffect, useState } from 'react';

// toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// firebase
import { app } from 'firebaseApp';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// components
import Layout from 'components/organisms/Layout';
import Router from 'components/Router';
import Loader from 'components/molecules/Loader';

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
    <>
      <ToastContainer />
      <Layout isAuthenticated={isAuthenticated}>
        {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
      </Layout>
    </>
  );
}

export default App;
