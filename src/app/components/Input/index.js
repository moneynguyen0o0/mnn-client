import React from 'react';
import { string, func } from 'prop-types';

const Input = ({ name, value = '', label, type = 'text', onChange }) => (
  <div>
    {label && <label>{label}</label>}
    <div>
      <input { ...{ name, value, type, onChange } }/>
    </div>
  </div>
);

Input.propTypes = {
  name: string.isRequired,
  value: string,
  label: string,
  type: string,
  onChange: func
};

export default Input;
