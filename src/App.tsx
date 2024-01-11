import 'styles/global.scss';

import { useContext, useEffect, useState } from 'react';
import Router from 'router/Router';
import AuthProvider, { AuthContext } from 'context/AuthContext';

import Layout from 'components/layouts/Layout';
import Loader from 'components/commons/loader/Loader';

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(false);
  }, [isAuthenticated]);

  return (
    <AuthProvider>
      <Layout isAuthenticated={isAuthenticated}>
        {isLoading ? <Loader /> : <Router />}
      </Layout>
    </AuthProvider>
  );
}
export default App;
