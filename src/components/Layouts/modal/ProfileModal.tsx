import { onSignOut } from 'components/commons/button/SignoutBtn';
import { NO_IMG } from 'constants/noimg';
import AuthContext from 'contexts/AuthContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import Modal from './Modal';
import SVGSignout from 'components/commons/SVG/SVGSignout';

import styles from './ProfileModal.module.scss';
import SVGProfile from 'components/commons/SVG/SVGProfile';
export default function ProfileModal() {
  const { user } = useContext(AuthContext);

  return (
    <Modal
      type="profile"
      btn={
        <img
          src={user?.photoURL ? user.photoURL : NO_IMG}
          alt="프로필 페이지"
        />
      }>
      <ul className={styles.profile__modal}>
        <li>
          <Link to="/profile">
            <SVGProfile />
            Profile
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
