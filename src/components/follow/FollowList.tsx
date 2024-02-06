import { NO_IMG } from 'constants/index';
import { UserDataInterface } from 'interface';
import { Link } from 'react-router-dom';

import styles from './FollowList.module.scss';
import FollowBtn from './FollowBtn';
import { useContext } from 'react';
import AuthContext from 'contexts/AuthContext';

export default function FollowList({
  users,
  type,
}: {
  users: UserDataInterface[];
  type: string;
}) {
  const { user: loginUser } = useContext(AuthContext);

  return (
    <div className={styles.follow_wrap}>
      <h2 className={styles.title}>
        {type} <strong>{users.length}</strong>
      </h2>

      {users && users.length > 0 ? (
        <ul className={styles.follow_list}>
          {users?.map((user, index) => (
            <li key={index} className={styles.follow_item}>
              <Link to={`/profile/${user?.uid}`}>
                <img src={user?.photoURL || NO_IMG} alt="" />
                <span className={styles.user_text}>
                  <strong>{user?.displayName}</strong>
                  <span>{user?.email}</span>
                </span>
              </Link>
              {user.uid && loginUser?.uid && (
                <FollowBtn profileId={user.uid} loginId={loginUser.uid} />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>팔로워가 없어요...</p>
      )}
    </div>
  );
}
