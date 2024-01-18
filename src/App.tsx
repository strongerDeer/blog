import 'styles/global.scss';

import Router from 'router/Router';

// toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// components
import Layout from 'components/layouts/Layout';

function App() {
  return (
    <>
      <ToastContainer />
      <Layout>
        <Router />
      </Layout>
    </>
  );
}
export default App;
