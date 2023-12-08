import AuthContext from 'context/AuthContext';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from 'firebaseApp';
import { useContext, useEffect, useState } from 'react';
import NotificationItem from './components/NotificationItem';

export interface NotificationsInterface {
  id: string;
  uid: string;
  url: string;
  createdAt: string;
  isRead: boolean;
  type: string;
  content: string;
}

export default function NotificationsPage() {
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
    <>
      {notifications?.length > 0 ? (
        <ul>
          {notifications?.map((notification) => (
            <NotificationItem key={notification.id} noti={notification} />
          ))}
        </ul>
      ) : (
        <p>알림이 없습니다.</p>
      )}
    </>
  );
}
