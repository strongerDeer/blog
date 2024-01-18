import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { db } from 'firebaseApp';
import { doc, getDoc } from 'firebase/firestore';
import { UserDataInterface } from 'interface';
import Profile from 'components/profile/Profile';
import Loader from 'components/commons/loader/Loader';

export default function ProfilePage() {
  const userId = useParams().id;
  const [userData, setUserData] = useState<UserDataInterface | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      const getUesrData = async () => {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data() as UserDataInterface);
        } else {
          setUserData(null);
        }

        setIsLoading(false);
      };
      getUesrData();
    }
  }, [userId]);

  if (isLoading) {
    return <Loader />;
  }
  return <Profile user={userData} />;
}
