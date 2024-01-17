import AuthContext from 'contexts/AuthContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './ProfileModal.module.scss';
import Modal from './Modal';

import { NO_IMG } from 'constants/index';
import { onSignOut } from 'utils/onSignOut';

import SVGProfile from 'components/svg/SVGProfile';
import SVGSignout from 'components/svg/SVGSignout';

export default function ProfileModal() {
  const { user } = useContext(AuthContext);

  return (
    <Modal
      type="profile"
      btn={<img src={user?.photoURL || NO_IMG} alt="프로필 페이지" />}>
      <ul className={styles.profile__modal}>
        <li>
          <Link to="/profile">
            <SVGProfile />
            Mypage
          </Link>
        </li>
        <li>
          <Link to="/profile/edit">
            <SVGProfile />
            Profile Edit
          </Link>
        </li>
        <li>
          <button type="button" onClick={onSignOut}>
            <SVGSignout />
            Logout
          </button>
        </li>
      </ul>
    </Modal>
  );
}
