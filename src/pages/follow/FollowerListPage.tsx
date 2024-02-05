import { NO_IMG } from 'constants/index';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { UserDataInterface } from 'interface';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

  return (
    <div className="min-width">
      <h2>Followers</h2>
      {followers && followers.length > 0 ? (
        <>
          {followers.map((follower, index) => (
            <li key={index}>
              <Link to="">
                <img src={follower?.photoURL || NO_IMG} alt="" />
                <strong> {follower?.displayName}</strong>
                <span>{follower?.email}</span>
              </Link>
            </li>
          ))}
        </>
      ) : (
        <p>팔로워가 없어요...</p>
      )}
    </div>
  );
}
