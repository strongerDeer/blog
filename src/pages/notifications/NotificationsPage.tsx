import NotificationItem from 'components/notification/NotificationItem';
import AuthContext from 'contexts/AuthContext';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from 'firebaseApp';
import { NotificationsInterface } from 'interface';
import { useContext, useEffect, useState } from 'react';

export default function NotificationsPage() {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState<NotificationsInterface[]>(
    [],
  );

  useEffect(() => {
    if (user) {
      let ref = collection(db, `users/${user?.uid}`, 'notifications');
      let notificationQuery = query(
        ref,
        where('uid', '==', user?.uid),
        orderBy('isRead'),
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

  const notReadNotiCount = notifications.filter(
    (noti) => noti.isRead === false,
  ).length;

  return (
    <div className="max-width">
      <h2>
        알림메시지 {notReadNotiCount}/{notifications?.length}개
      </h2>
      {notifications?.length > 0 ? (
        <ul>
          {notifications?.map((notification) => (
            <NotificationItem
              key={notification.id}
              noti={notification}
              btnShow
            />
          ))}
        </ul>
      ) : (
        <p>알림이 없습니다.</p>
      )}
    </div>
  );
}
