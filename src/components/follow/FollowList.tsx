import { NO_IMG } from 'constants/index';
import { FollowInterface, UserDataInterface } from 'interface';
import { Link } from 'react-router-dom';

import styles from './FollowList.module.scss';
import FollowBtn from './FollowBtn';
import { useContext, useEffect, useState } from 'react';
import AuthContext from 'contexts/AuthContext';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from 'firebaseApp';

export default function FollowList({
  users,
  type,
}: {
  users: UserDataInterface[];
  type: string;
}) {
  const { user: loginUser } = useContext(AuthContext);

  const [followers, setFollowers] = useState<FollowInterface[]>([]);
  const [followings, setFollowings] = useState<FollowInterface[]>([]);

  useEffect(() => {
    if (loginUser?.uid) {
      // 팔로워
      let followerRef = collection(db, `users/${loginUser.uid}/followers`);
      let followerQuery = query(followerRef, orderBy('displayName', 'asc'));

      onSnapshot(followerQuery, (snapshot) => {
        let dataObj = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setFollowers(dataObj as FollowInterface[]);
      });

      // 팔로잉
      let followingRef = collection(db, `users/${loginUser.uid}/followings`);
      let followingQuery = query(followingRef, orderBy('displayName', 'asc'));

      onSnapshot(followingQuery, (snapshot) => {
        let dataObj = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setFollowings(dataObj as FollowInterface[]);
      });
    }
  }, [loginUser?.uid]);

  console.log(followers, followings);

  return (
    <div className={styles.follow_wrap}>
      {type === 'followers' ? (
        <>
          <h2 className={styles.title}>
            {type} <strong>{followers.length}</strong>
          </h2>

          {followers.length > 0 ? (
            <ul className={styles.follow_list}></ul>
          ) : (
            <p>팔로워가 없어요...</p>
          )}
        </>
      ) : (
        <>
          <h2 className={styles.title}>
            {type} <strong>{followings.length}</strong>
          </h2>
          {followings.length > 0 ? (
            <ul className={styles.follow_list}>
              {followings.map((following, index) => (
                <li key={index} className={styles.follow_item}>
                  <Link to={`/profile/${following?.uid}`}>
                    <img src={following?.photoURL || NO_IMG} alt="" />
                    <span className={styles.user_text}>
                      <strong>{following?.displayName}</strong>
                      <span>{following?.email}</span>
                    </span>
                  </Link>

                  {/* 수정필요 */}
                  <FollowBtn />
                </li>
              ))}
            </ul>
          ) : (
            <p>팔로잉하고 있는 유저가 없어요</p>
          )}
        </>
      )}

      {followers.length > 0 ? (
        <ul className={styles.follow_list}></ul>
      ) : (
        <p></p>
      )}
    </div>
  );
}
