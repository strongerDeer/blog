import { NO_IMG } from 'constants/index';

import styles from './TodayImage.module.scss';

export default function TodayImage({ imgUrl }: { imgUrl?: string }) {
  return (
    <div className={styles.main_img}>
      <img src={imgUrl || NO_IMG} alt="" />
    </div>
  );
}
