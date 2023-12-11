import SVGNotification from 'components/commons/SVG/SVGNotification';
import Btn from 'components/commons/button/Btn';
import { useContext, useEffect, useRef, useState } from 'react';
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
        where('isRead', '==', true),
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

  return notifications?.length > 0 ? (
    <Modal
      btn={
        <>
          <SVGNotification />
          <span className="a11y-hidden">알림</span>
          <span className="">{notifications.length}</span>
        </>
      }>
      <ul>
        {notifications?.slice(0, 10).map((notification) => (
          <NotificationItem key={notification.id} noti={notification} />
        ))}
      </ul>
      <Link to="/notifications">더보기</Link>
    </Modal>
  ) : (
    <Btn href="/notifications">
      <SVGNotification />
      <span className="a11y-hidden">알림</span>
    </Btn>
  );
}
