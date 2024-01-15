import 'styles/global.scss';

import { useEffect, useState } from 'react';
import Router from 'router/Router';

// toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// firebase
import { app } from 'firebaseApp';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// components
import Layout from 'components/layouts/Layout';
import Loader from 'components/commons/loader/Loader';

function App() {
  const auth = getAuth(app);
  // auth를 체크하기 전(초기화 전) loader를 띄워주는 용도
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
      setIsLoading(false);
    });
  }, [auth]);

  return (
    <>
      <ToastContainer />
      <Layout isAuthenticated={isAuthenticated}>
        {isLoading ? <Loader /> : <Router isAuthenticated={isAuthenticated} />}
      </Layout>
    </>
  );
}
export default App;
