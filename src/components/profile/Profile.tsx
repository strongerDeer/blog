import { UserDataInterface } from 'interface';
import styles from './Profile.module.scss';
import { NO_PROFILE } from 'constants/index';

export default function Profile({ user }: { user: UserDataInterface | null }) {
  return (
    <div className="max-width">
      <div className={styles.profile__section}>
        <h3>About Me</h3>
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
            팔로우 <strong>0</strong>
          </p>

          <p>
            팔로잉 <strong> 0</strong>
          </p>
        </div>
      </div>
    </div>
  );
}