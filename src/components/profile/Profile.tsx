import { UserDataInterface } from 'interface';
import styles from './Profile.module.scss';
import { NO_PROFILE } from 'constants/index';
import FollowBtn from 'components/follow/FollowBtn';
import { useContext, useEffect, useState } from 'react';
import AuthContext from 'contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { Link } from 'react-router-dom';

export default function Profile({ loginId }: { loginId?: string }) {
  const { user } = useContext(AuthContext);
  const id = useParams().id;
  const [userData, setUserData] = useState<UserDataInterface | null>(null);

  const getUserData = async (id: string) => {
    const docRef = doc(db, 'users', id);

    onSnapshot(docRef, (doc) => {
      setUserData(doc.data() as UserDataInterface);
    });
  };

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
              <strong>
                {userData?.followerList ? userData?.followerList?.length : 0}
              </strong>
            </Link>

            <Link to="/followings">
              팔로잉{' '}
              <strong>
                {userData?.followingList ? userData?.followingList?.length : 0}
              </strong>
            </Link>
          </div>

          {id && user?.uid && <FollowBtn loginId={user?.uid} profileId={id} />}
        </>
      </div>
    </div>
  );
}
