import { NotificationsInterface } from 'interface';

import styles from './NotificationItem.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import classNames from 'classnames';
import getTime from 'utils/getTime';
import useFindUser from 'hooks/useFindUser';
export default function NotificationItem({
  noti,
  btnShow,
}: {
  noti: NotificationsInterface;
  btnShow?: boolean;
}) {
  const { findUser } = useFindUser(noti.author);

  const onClickNotification = async () => {
    // isRead 업데이트
    const ref = doc(db, `users/${noti.uid}`, 'notifications', noti.id);
    await updateDoc(ref, {
      isRead: true,
    });
  };

  const deleteNotification = async (uid: string, id: string) => {
    await deleteDoc(doc(db, `users/${uid}`, `notifications/${id}`));
  };

  return (
    <li
      className={classNames(
        styles.noti__item,
        noti.isRead ? null : styles.unread,
      )}>
      <Link
        to={`${noti.url}`}
        onClick={onClickNotification}
        className={styles.noti__link}>
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

      {btnShow && (
        <div className={styles.noti__btnGroup}>
          {!noti.isRead && (
            <button type="button" onClick={onClickNotification}>
              읽음
            </button>
          )}

          <button
            type="button"
            onClick={() => deleteNotification(`${noti.uid}`, noti.id)}>
            삭제
          </button>
        </div>
      )}
    </li>
  );
}
