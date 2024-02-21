import { NotificationsInterface } from 'interface';

import styles from './NotificationItem.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import classNames from 'classnames';
import getTime from 'utils/getTime';
import useFindUser from 'hooks/useFindUser';
export default function NotificationItem({
  noti,
}: {
  noti: NotificationsInterface;
}) {
  const { findUser } = useFindUser(noti.author);

  const onClickNotification = async () => {
    // isRead 업데이트
    const ref = doc(db, `users/${noti.uid}`, 'notifications', noti.id);
    await updateDoc(ref, {
      isRead: true,
    });
  };

  return (
    <li className={styles.noti__item}>
      <Link
        to={`${noti.url}`}
        onClick={onClickNotification}
        className={classNames(
          styles.noti__link,
          noti.isRead ? '' : styles.unread,
        )}>
        {noti.type === 'follow' && (
          <p>
            <strong>{findUser?.displayName}</strong>님이 팔로우합니다.
          </p>
        )}

        {noti.type === 'like' && (
          <p>
            '<strong>{noti?.postTitle}</strong>' 글을{' '}
            <strong>{findUser?.displayName}</strong>님이 좋아합니다.
          </p>
        )}

        {noti.type === 'comment' && (
          <p>
            '<strong>{noti?.postTitle}</strong>' 글에{' '}
            <strong>{findUser?.displayName}</strong>님이 '
            <strong>{noti?.comment}</strong>' 코멘트를 달았습니다.
          </p>
        )}

        {noti.createdAt && (
          <span className={styles.createdAt}>{getTime(noti.createdAt)}</span>
        )}

        <span className="a11y-hidden">
          {noti.isRead ? '읽음' : '읽지 않음'}
        </span>
      </Link>
    </li>
  );
}
