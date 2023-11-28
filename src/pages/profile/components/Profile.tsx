import { useContext } from 'react';

import styles from './Profile.module.scss';
// firebase
import AuthContext from 'context/AuthContext';

import BtnLogout from '../../../components/commons/button/SignoutBtn';
import Btn from 'components/commons/button/Btn';
import { noimg } from 'utils/constants';
import classNames from 'classnames';

interface ProfileProps {
  image?: string;
  nickname?: string;
  email?: string;
  createAt?: string;
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
          src={user?.photoURL ? user.photoURL : noimg}
          alt=""
          className={styles.user__img}
        />
        <p className={styles.user__name}>{user?.displayName}</p>

        <p className={styles.user__email}>{user?.email}</p>
      </div>

      <div>
        <h3>Categories</h3>
      </div>

      <div>
        <h3>Follow</h3>
      </div>

      <div className={styles.btn__group}>
        <BtnLogout />
        <Btn href="/profile/edit">프로필 수정</Btn>
      </div>
    </section>
  );
}
