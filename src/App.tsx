import 'styles/reset.scss';

import { useState } from 'react';

// toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// firebase
import { app } from 'firebaseApp';
import { getAuth } from 'firebase/auth';

// components
import Layout from 'components/Layout';
import Router from 'components/Router';

function App() {
  const auth = getAuth(app);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser,
  );

  return (
    <>
      <ToastContainer />
      <Layout>
        <Router isAuthenticated={isAuthenticated} />
      </Layout>
    </>
  );
}

export default App;
