import FollowList from 'components/follow/FollowList';

import { doc, onSnapshot } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { UserDataInterface } from 'interface';
import { useCallback, useEffect, useState } from 'react';

import styles from './Follow.module.scss';
export default function FollowerListPage({ loginId }: { loginId: string }) {
  const [followers, setFollowers] = useState<UserDataInterface[]>([]);

  const getFollowers = useCallback(async (id: string) => {
    setFollowers([]);
    const docRef = doc(db, 'users', id);
    onSnapshot(docRef, (doc) => {
      setFollowers(doc?.data()?.followerList as UserDataInterface[]);
    });
  }, []);

  useEffect(() => {
    if (loginId) {
      getFollowers(loginId);
    }
  }, [loginId]);

  return <FollowList users={followers} type="followers" />;
}
