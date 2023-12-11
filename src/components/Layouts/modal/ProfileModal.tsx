import SignoutBtn from 'components/commons/button/SignoutBtn';
import { NO_IMG } from 'constants/noimg';
import AuthContext from 'contexts/AuthContext';
import { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './ProfileModal.module.scss';
import Modal from './Modal';

export default function ProfileModal() {
  const { user } = useContext(AuthContext);

  return (
    <Modal
      btn={
        <img
          src={user?.photoURL ? user.photoURL : NO_IMG}
          alt="프로필 페이지"
          className={styles.profile}
        />
      }>
      <ul>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <SignoutBtn />
        </li>
      </ul>
    </Modal>
  );
}
