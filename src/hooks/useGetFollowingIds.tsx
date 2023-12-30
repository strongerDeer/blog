import AuthContext from 'contexts/AuthContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { useCallback, useContext, useEffect, useState } from 'react';

interface UserProps {
  id: string;
}
export default function useGetFollowingIds() {
  const { user } = useContext(AuthContext);
  const [followingIds, setFollowingIds] = useState<string[]>(['']);

  const getFollowingIds = useCallback(async () => {
    if (user?.uid) {
      const ref = doc(db, 'following', user?.uid);
      onSnapshot(ref, (doc) => {
        setFollowingIds(['']);
        doc?.data()?.users?.map((user: UserProps) => {
          setFollowingIds((prev: string[]) =>
            prev ? [...prev, user?.id] : [],
          );
        });
      });
    }
  }, [user?.uid]);

  useEffect(() => {
    getFollowingIds();
  }, []);
  return { followingIds };
}
