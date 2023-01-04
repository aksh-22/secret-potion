import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {en} from './translations';
//empty for now
const resources = {
  // en: {
  //   translation: en,
  // },
  en,
};

i18n.init({
  compatibilityJSON: 'v3',
});

i18n.use(initReactI18next).init({
  resources,
  //language to use if translations in user language are not available
  fallbackLng: 'en',
  // lng:"en",
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
});

export default i18n;
