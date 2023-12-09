import { Link, useNavigate } from 'react-router-dom';
import { NotificationsInterface } from '..';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';

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
    <li>
      <button type="button" onClick={() => onClickNotification(noti?.url)}>
        {noti.type === 'following' && <>{noti.content}팔로우하였습니다.</>}
        {noti.type === 'comment' && <>{noti.content}에 댓글이 달렸습니다.</>}
        {noti.createdAt}

        {noti.isRead ? '읽음' : '읽지 않음'}
      </button>
    </li>
  );
}
