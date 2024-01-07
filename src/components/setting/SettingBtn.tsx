import SVGSetting from 'components/svg/SVGSetting';
import styles from './SettingBtn.module.scss';

export default function SettingBtn() {
  return (
    <button type="button" className={styles.setting_btn}>
      <SVGSetting />
      <span className="a11y-hidden">알림</span>
    </button>
  );
}
