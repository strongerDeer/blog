import { ReactNode, createContext, useEffect, useState } from 'react';

// firebase
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from 'firebaseApp';
import { UserDataInterface } from 'interface';

interface AuthProps {
  children: ReactNode;
}

const AuthContext = createContext({
  user: null as UserDataInterface | null,
  setUser: null as any,
});

export const AuthContextProvider = ({ children }: AuthProps) => {
  const auth = getAuth(app);
  const [currentUser, setCurrentUser] = useState<UserDataInterface | null>(
    null,
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user?.email,
          provider: user?.providerData[0].providerId,
        });
      } else {
        setCurrentUser(null);
      }
    });
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        setUser: setCurrentUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
