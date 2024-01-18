import { ReactNode, createContext, useEffect, useState } from 'react';

// firebase
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from 'firebaseApp';
import { UserDataInterface } from 'interface';
import Loader from 'components/commons/loader/Loader';

const AuthContext = createContext({
  user: null as UserDataInterface | null,
  setUser: null as any,
  isLoading: true,
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const auth = getAuth(app);
  const [currentUser, setCurrentUser] = useState<UserDataInterface | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        setUser: setCurrentUser,
        isLoading: false,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
