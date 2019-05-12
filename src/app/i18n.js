import i18n from 'i18next';

const options = {
  fallbackLng: 'en',

  // we only provide en, vi -> no region specific locals like en-US, vi-VN
  load: 'languageOnly',

  // have a common namespace used around the full app
  ns: ['common', 'home'],
  defaultNS: 'common',

  debug: true,

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ',',
    format: (value, format, lng) => {
      if (format === 'uppercase') return value.toUpperCase()
      return value
    }
  }
};

if (process.browser) {
  const XHR = require('i18next-xhr-backend');
  const LanguageDetector = require('i18next-browser-languagedetector');

  i18n
    .use(XHR)
    .use(LanguageDetector);
} else {
  const path = require('path');
  const Backend = require('i18next-node-fs-backend');
  const { LanguageDetector } = require('i18next-express-middleware');

  // Other options for backend
  options.preload = ['en', 'vi'],
  options.backend = {
    loadPath: path.resolve(process.cwd(), 'src/app/locales/{{lng}}/{{ns}}.json')
  };

  i18n
    .use(Backend)
    .use(LanguageDetector);
}

if (!i18n.isInitialized) i18n.init(options);

export default i18n;
