import { useNavigate } from 'react-router-dom';

import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { NotificationsInterface } from 'types/Notifications';

import styles from './NotificationItem.module.scss';
export default function NotificationItem({
  noti,
}: {
  noti: NotificationsInterface;
}) {
  const navigate = useNavigate();
  const onClickNotification = async (url: string) => {
    navigate(url);
    // isRead 업데이트
    const ref = doc(db, 'notifications', noti.id);
    await updateDoc(ref, {
      isRead: true,
    });
  };
  return (
    <li className={styles.noti__item}>
      <button
        type="button"
        className={noti.isRead ? '' : styles.unread}
        onClick={() => onClickNotification(noti?.url)}>
        {noti.type === 'following' && <>{noti.content}팔로우하였습니다.</>}
        {noti.type === 'comment' && <>{noti.content}에 댓글이 달렸습니다.</>}
        {noti.createdAt}

        <span className="a11y-hidden">
          {noti.isRead ? '읽음' : '읽지 않음'}
        </span>
      </button>
    </li>
  );
}
