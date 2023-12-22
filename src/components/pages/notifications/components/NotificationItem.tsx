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
        {noti.type === 'following' && (
          <span>
            <strong>{noti.content}</strong>님이 회원님을 팔로우합니다.
          </span>
        )}
        {noti.type === 'comment' && (
          <span>
            <strong>'{noti?.post}'</strong> 글에 <strong>{noti.author}</strong>
            님이 댓글을 남겼습니다: "{noti.content}"
          </span>
        )}
        <span className={styles.createdAt}> {noti.createdAt}</span>

        <span className="a11y-hidden">
          {noti.isRead ? '읽음' : '읽지 않음'}
        </span>
      </button>
    </li>
  );
}
