import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(XHR)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',

    // we only provide en, vi -> no region specific locals like en-US, vi-VI
    load: 'languageOnly',

    // have a common namespace used around the full app
    ns: ['common', 'home'],
    defaultNS: 'common',

    interpolation: {
      escapeValue: false // not needed for react!!
    }
  });

export default i18n;
