import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { db } from 'firebaseApp';
import { UserDataInterface } from 'interface';
import { useEffect, useState } from 'react';

export default function useFindUser(uid: string | undefined) {
  const [findUser, setFindUser] = useState<UserDataInterface | null>({});

  useEffect(() => {
    if (uid) {
      const getUesrData = async () => {
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFindUser(docSnap.data() as UserDataInterface);
        } else {
          setFindUser(null);
        }
      };
      getUesrData();
    }
  }, [uid]);

  return { findUser };
}
