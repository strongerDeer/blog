import { ReactNode, createContext, useEffect, useState } from 'react';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from 'firebaseApp';

export const AuthContext = createContext({ isAuthenticated: false });

export default function AuthProvider({ children }: { children: ReactNode }) {
  const auth = getAuth(app);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser,
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
