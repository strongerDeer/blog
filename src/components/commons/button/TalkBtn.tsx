import AuthContext from 'context/AuthContext';

import { useContext } from 'react';

import styles from './TalkBtn.module.scss';
import { Link } from 'react-router-dom';
import SVGTalk from '../SVG/SVGTalk';
export default function TalkBtn({ href }: any) {
  return (
    <Link to={href} className={styles.talkBtn}>
      <SVGTalk /> 0
    </Link>
  );
}
