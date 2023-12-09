import { useContext } from 'react';

import styles from './Profile.module.scss';
// firebase
import AuthContext from 'contexts/AuthContext';

import BtnLogout from '../../../commons/button/SignoutBtn';
import Btn from 'components/commons/button/Btn';
import classNames from 'classnames';
import FollowBtn from 'components/commons/button/FollowBtn';
import { NO_IMG } from 'constants/noimg';

interface ProfileProps {
  image?: string;
  nickname?: string;
  email?: string;
  createdAt?: string;
  uid?: string;
  id?: string;
}
export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <section className={classNames('profile', styles.profile__section)}>
      <div>
        <h3>About Me</h3>
        <img
          src={user?.photoURL ? user.photoURL : NO_IMG}
          alt=""
          className={styles.user__img}
        />
        <p className={styles.user__name}>{user?.displayName}</p>

        <p className={styles.user__email}>{user?.email}</p>
      </div>

      <div className={styles.btn__group}>
        게시글
        <Btn href="/follower" bgNone={true}>
          팔로우 00
        </Btn>
        <Btn href="/following" bgNone={true}>
          팔로잉 00
        </Btn>
      </div>

      <div>
        <h3>Categories</h3>
      </div>

      <div>
        <h3>Contact</h3>
      </div>

      <div className={styles.btn__group}>
        <BtnLogout />
        <Btn href="/profile/edit">프로필 수정</Btn>

        <FollowBtn uid={user?.uid ? user.uid : ''} />
      </div>
    </section>
  );
}
