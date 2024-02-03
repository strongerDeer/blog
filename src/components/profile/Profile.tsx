import { UserDataInterface } from 'interface';
import styles from './Profile.module.scss';
import { NO_PROFILE } from 'constants/index';
import FollowBtn from 'components/follow/FollowBtn';
import { useContext, useEffect, useState } from 'react';
import AuthContext from 'contexts/AuthContext';
import { useParams } from 'react-router-dom';
import useFindUser from 'hooks/useFindUser';

export default function Profile({
  user,
  userId,
}: {
  user: UserDataInterface | null;
  userId?: string;
}) {
  const id = useParams().id;

  const { user: loginUser } = useContext(AuthContext);
  const { findUser: profileUser } = useFindUser(id);

  const [userData, setUserData] = useState<UserDataInterface | null>(null);

  useEffect(() => {
    if (id) {
      setUserData(profileUser);
    } else {
      setUserData(loginUser);
    }
  }, [id, loginUser, profileUser]);

  return (
    <div className="max-width">
      <div className={styles.profile__section}>
        <h3>About Me</h3>

        <>
          <img
            src={user?.photoURL ? user.photoURL : NO_PROFILE}
            alt=""
            className={styles.user__img}
          />
          <p className={styles.user__name}>{user?.displayName}</p>

          <p className={styles.user__email}>{user?.email}</p>

          <div className={styles.count}>
            <p>
              게시글 <strong> 0</strong>
            </p>

            <p>
              팔로우{' '}
              <strong>
                {userData?.followerList ? userData?.followerList?.length : 0}
              </strong>
            </p>

            <p>
              팔로잉{' '}
              <strong>
                {userData?.followingList ? userData?.followingList?.length : 0}
              </strong>
            </p>
          </div>

          {id !== loginUser?.uid && id && loginUser?.uid && (
            <FollowBtn loginId={loginUser.uid} uid={id} />
          )}
        </>
      </div>
    </div>
  );
}
