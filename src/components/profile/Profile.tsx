import { FollowInterface, UserDataInterface } from 'interface';
import styles from './Profile.module.scss';
import { NO_PROFILE } from 'constants/index';
import FollowBtn from 'components/follow/FollowBtn';
import { useCallback, useContext, useEffect, useState } from 'react';
import AuthContext from 'contexts/AuthContext';
import { useParams } from 'react-router-dom';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from 'firebaseApp';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { user } = useContext(AuthContext);
  const id = useParams().id;
  const [userData, setUserData] = useState<UserDataInterface | null>(null);

  const pageId = id ? id : user?.uid;

  const [followers, setFollowers] = useState<FollowInterface[]>([]);
  const [followings, setFollowings] = useState<FollowInterface[]>([]);

  const getUserData = async (id: string) => {
    const docRef = doc(db, 'users', id);

    onSnapshot(docRef, (doc) => {
      setUserData(doc.data() as UserDataInterface);
    });
  };

  useEffect(() => {
    // 팔로워
    let followerRef = collection(db, `users/${pageId}/followers`);
    let followerQuery = query(followerRef, orderBy('displayName', 'asc'));

    onSnapshot(followerQuery, (snapshot) => {
      let dataObj = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc?.id,
      }));
      setFollowers(dataObj as FollowInterface[]);
    });

    // 팔로잉
    let followingRef = collection(db, `users/${pageId}/followings`);
    let followingQuery = query(followingRef, orderBy('displayName', 'asc'));

    onSnapshot(followingQuery, (snapshot) => {
      let dataObj = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc?.id,
      }));
      setFollowings(dataObj as FollowInterface[]);
    });
  }, []);

  useEffect(() => {
    if (id) {
      getUserData(id);
    } else if (user?.uid) {
      getUserData(user?.uid);
    }
  }, [id, user?.uid]);

  return (
    <div className="max-width">
      <div className={styles.profile__section}>
        <h3>About Me</h3>

        <>
          <img
            src={userData?.photoURL ? userData.photoURL : NO_PROFILE}
            alt=""
            className={styles.user__img}
          />
          <p className={styles.user__name}>{userData?.displayName}</p>

          <p className={styles.user__email}>{userData?.email}</p>

          <div className={styles.count}>
            <p>
              게시글 <strong> 0</strong>
            </p>

            <Link to="/followers">
              팔로우{' '}
              <strong>{followers?.length ? followers?.length : 0}</strong>
            </Link>

            <Link to="/followings">
              팔로잉{' '}
              <strong>{followings?.length ? followings?.length : 0}</strong>
            </Link>
          </div>

          {id && user?.uid && <FollowBtn loginId={user?.uid} profileId={id} />}
        </>
      </div>
    </div>
  );
}
