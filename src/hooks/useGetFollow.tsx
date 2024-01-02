import { useContext, useEffect, useState } from 'react';

import { db } from 'firebaseApp';
import { doc, onSnapshot } from 'firebase/firestore';

import { FollowInterface } from 'types/Follow';
import AuthContext from 'contexts/AuthContext';

export default function useGetFollow(type: string) {
  const { user } = useContext(AuthContext);
  const [follows, setFollows] = useState<FollowInterface[]>([]);

  useEffect(() => {
    if (user?.uid) {
      const docRef = doc(db, type, user.uid);
      onSnapshot(docRef, (doc) => {
        setFollows(doc.data()?.users as FollowInterface[]);
      });
    }
  }, [user]);

  return follows;
}
