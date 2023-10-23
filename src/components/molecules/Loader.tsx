import styles from './Loader.module.scss';
export default function Loader() {
  return (
    <div className={styles['loader-wrap']}>
      <div className={styles.loader}></div>
      <p>Loading</p>
    </div>
  );
}
