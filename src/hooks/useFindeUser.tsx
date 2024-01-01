import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { useEffect, useState } from 'react';
import { Users } from 'types/Users';

export default function useFindUser(uid: string | undefined) {
  const [findUser, setFindUser] = useState<Users | null>({});

  useEffect(() => {
    if (uid) {
      const ref = collection(db, 'users');
      let userQuery = query(ref, where('uid', '==', uid));

      onSnapshot(userQuery, (snapShot) => {
        let dataObj = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));

        setFindUser(dataObj[0] as Users);
      });
    }
  }, [uid]);

  return { findUser };
}
