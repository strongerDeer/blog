import { useRecoilValue } from 'recoil';
import { TRANSLATIONS } from 'constants/language';
import { languageState } from 'recoils/atom';

export default function useTranslation() {
  const lang = useRecoilValue(languageState);

  return (key: keyof typeof TRANSLATIONS) => {
    return TRANSLATIONS[key][lang];
  };
}
