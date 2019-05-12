import React from 'react';
import { translate } from 'react-i18next';

const Lang = ({ i18n }) => {
  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  return (
    <ul>
      <li>
        <button onClick={() => changeLanguage('vi')}>vi</button>
      </li>
      <li>
        <button onClick={() => changeLanguage('en')}>en</button>
      </li>
    </ul>
  );
};

export default translate()(Lang);
