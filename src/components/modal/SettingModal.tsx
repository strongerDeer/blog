import { useRecoilState } from 'recoil';

import Modal from './Modal';

import styles from './SettingModal.module.scss';
import SVGSetting from 'components/svg/SVGSetting';
export default function SettingModal() {
  // const [language, setLanguage] = useRecoilState(languageState);

  // const changeLanguage = () => {
  //   setLanguage((language) => (language === 'ko' ? 'en' : 'ko'));
  //   localStorage.setItem('language', language === 'ko' ? 'en' : 'ko');
  // };

  return (
    <Modal
      btn={
        <>
          <SVGSetting />
          <span className="a11y-hidden">알림</span>
        </>
      }>
      <ul className={styles.setting__modal}>
        <li>
          theme:
          {/* <ThemeBtn /> */}
        </li>
        <li>
          language:
          <input type="radio" name="lang" id="lang-en" />
          <label htmlFor="lang-kr">en</label>
          <input type="radio" name="lang" id="lang-kr" />
          <label htmlFor="lang-kr">ko</label>
          {/* <button type="button" onClick={changeLanguage}>
            {language}
          </button> */}
        </li>
      </ul>
    </Modal>
  );
}
