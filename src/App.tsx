import 'styles/reset.scss';

import Layout from 'components/Layout';
import Router from 'components/Router';
import { useState } from 'react';
import { app } from 'firebaseApp';
import { getAuth } from 'firebase/auth';

function App() {
  const auth = getAuth(app);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser,
  );

  return (
    <Layout>
      <Router isAuthenticated={isAuthenticated} />
    </Layout>
  );
}

export default App;
