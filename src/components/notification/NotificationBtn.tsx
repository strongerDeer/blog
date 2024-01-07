import SVGNotification from 'components/svg/SVGNotification';
import styles from './NotificationBtn.module.scss';

export default function NotificationBtn() {
  return (
    <button type="button" className={styles.notification_btn}>
      <SVGNotification />
      <span className="a11y-hidden">알림</span>
    </button>
  );
}
