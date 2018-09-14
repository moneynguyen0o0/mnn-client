import React from 'react';
import { translate } from 'react-i18next';

const Lang = ({ i18n }) => {
  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  return (
    <ul>
      <li onClick={() => changeLanguage('en')}>en</li>
      <li onClick={() => changeLanguage('vi')}>vi</li>
    </ul>
  );
};

export default translate()(Lang);
