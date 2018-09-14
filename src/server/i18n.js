import i18n from 'i18next';
import Backend from 'i18next-node-fs-backend';
import { LanguageDetector } from 'i18next-express-middleware';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',

    // we only provide en, vi -> no region specific locals like en-US, vi-VI
    load: 'languageOnly',

    // preload all langages
    preload: ['en', 'vi'],

    // have a common namespace used around the full app
    ns: ['common', 'home'],
    defaultNS: 'common',

    backend: {
      loadPath: 'locales/{{lng}}/{{ns}}.json',
      jsonIndent: 2
    }
  });

export default i18n;
