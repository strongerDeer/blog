import ReactDOM from 'react-dom/client';

import App from 'App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from 'contexts/AuthContext';
import { ThemeContextProvider } from 'contexts/ThemeContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <AuthContextProvider>
    <ThemeContextProvider>
      <Router>
        <App />
      </Router>
    </ThemeContextProvider>
  </AuthContextProvider>,
);
