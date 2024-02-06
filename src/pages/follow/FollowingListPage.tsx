import FollowList from 'components/follow/FollowList';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { UserDataInterface } from 'interface';
import { useCallback, useEffect, useState } from 'react';

import styles from './Follow.module.scss';

export default function FollowingListPage({ loginId }: { loginId: string }) {
  const [followings, setFollowings] = useState<UserDataInterface[]>([]);

  const getFollowers = useCallback(async (id: string) => {
    setFollowings([]);
    const docRef = doc(db, 'users', id);
    onSnapshot(docRef, (doc) => {
      setFollowings(doc?.data()?.followingList as UserDataInterface[]);
    });
  }, []);

  useEffect(() => {
    if (loginId) {
      getFollowers(loginId);
    }
  }, [loginId]);

  return <FollowList users={followings} type="followings" />;
}
