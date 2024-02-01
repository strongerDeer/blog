import { Link } from 'react-router-dom';

import styles from './TalkBtn.module.scss';
import SVGTalk from 'components/svg/SVGTalk';

export default function TalkBtn({ count, href }: any) {
  return (
    <Link to={href} className={styles.talkBtn}>
      <SVGTalk /> {count ? count : 0}
    </Link>
  );
}
