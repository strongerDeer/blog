import SVGSetting from 'components/commons/SVG/SVGSetting';
import Btn from 'components/commons/button/Btn';
import ThemeBtn from 'components/commons/button/ThemeBtn';
import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { languageState } from 'recoils/atom';
import Modal from './Modal';

export default function SettingModal() {
  const [language, setLanguage] = useRecoilState(languageState);

  const changeLanguage = () => {
    setLanguage((language) => (language === 'ko' ? 'en' : 'ko'));
    localStorage.setItem('language', language === 'ko' ? 'en' : 'ko');
  };

  return (
    <Modal
      btn={
        <>
          <SVGSetting />
          <span className="a11y-hidden">알림</span>
        </>
      }>
      <ul>
        <ThemeBtn />
        <Btn bgNone onClick={changeLanguage}>
          {language}
        </Btn>
      </ul>
    </Modal>
  );
}
