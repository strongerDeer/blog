import { NO_IMG } from 'constants/index';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { UserDataInterface } from 'interface';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
  console.log(followings);

  return (
    <div className="min-width">
      <h2>Following</h2>
      {followings && followings.length > 0 ? (
        <>
          {followings.map((following, index) => (
            <li key={index}>
              <Link to="">
                <img src={following?.photoURL || NO_IMG} alt="" />
                <strong> {following?.displayName}</strong>
                <span>{following?.email}</span>
              </Link>
            </li>
          ))}
        </>
      ) : (
        <p>팔로잉 중인 유저가 없어요...</p>
      )}
    </div>
  );
}
