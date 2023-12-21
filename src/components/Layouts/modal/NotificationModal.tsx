import SVGNotification from 'components/commons/SVG/SVGNotification';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import { NotificationsInterface } from 'types/Notifications';
import AuthContext from 'contexts/AuthContext';
import NotificationItem from 'components/pages/notifications/components/NotificationItem';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from 'firebaseApp';

import styles from './NotificationModal.module.scss';

export default function NotificationModal() {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState<NotificationsInterface[]>(
    [],
  );

  useEffect(() => {
    if (user) {
      let ref = collection(db, 'notifications');
      let notificationQuery = query(
        ref,
        where('uid', '==', user?.uid),
        where('isRead', '==', false),
        orderBy('createdAt', 'desc'),
      );
      onSnapshot(notificationQuery, (snapShot) => {
        let dataObj = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));

        setNotifications(dataObj as NotificationsInterface[]);
      });
    }
  }, [user]);

  return (
    <Modal
      type="noti"
      btn={
        <>
          <SVGNotification />
          <span className="a11y-hidden">알림</span>
          {notifications.length > 0 && (
            <span className={styles.noti__count}>{notifications.length}</span>
          )}
        </>
      }>
      {notifications?.length > 0 ? (
        <>
          <ul>
            {notifications?.slice(0, 5).map((notification) => (
              <NotificationItem key={notification.id} noti={notification} />
            ))}
          </ul>
        </>
      ) : (
        <p className={styles.no__noti}>새로운 알림이 없습니다.</p>
      )}
      <Link to="/notifications" className={styles.link}>
        모든 알림 보기
      </Link>
    </Modal>
  );
}
