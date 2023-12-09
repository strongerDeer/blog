import styles from './Today.module.scss';

export default function Today() {
  const now = new Date();

  const date = now.getDate();
  let day;
  let month;

  switch (now.getMonth() + 1) {
    case 1:
      month = 'Jan.';
      break;
    case 2:
      month = 'Feb.';
      break;
    case 3:
      month = 'Mar.';
      break;
    case 4:
      month = 'Apr.';
      break;
    case 5:
      month = 'May.';
      break;
    case 6:
      month = 'Jun.';
      break;
    case 7:
      month = 'Jul.';
      break;
    case 8:
      month = 'Aug.';
      break;
    case 9:
      month = 'Sep.';
      break;
    case 10:
      month = 'Oct.';
      break;
    case 11:
      month = 'Nov.';
      break;
    case 12:
      month = 'Dec.';
      break;
  }

  switch (now.getDay()) {
    case 1:
      day = 'Monday';
      break;
    case 2:
      day = 'Tuesday';
      break;
    case 3:
      day = 'Wednesday';
      break;
    case 4:
      day = 'Thursday';
      break;
    case 5:
      day = 'Friday';
      break;
    case 6:
      day = 'Saturday';
      break;
    case 6:
      day = 'Sunday';
      break;
  }

  return (
    <div className={styles.subBg}>
      <p className={styles.today}>
        <span className={styles.month}>{month}</span>
        <span className={styles.date}>{date}</span>
        <span className={styles.day}>{day}</span>
      </p>
    </div>
  );
}
