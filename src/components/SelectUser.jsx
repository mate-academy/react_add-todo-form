import React from 'react';
import PropTypes from 'prop-types';
import { Option } from './Option';

export const Select = ({
  onChange,
  value,
  selectValidation,
  names
}) => (
  <>
    <select
      name="userNames"
      onChange={onChange}
      value={value}
    >
      {['Select user', ...names].map(name => (
        <Option
          name={name}
          key={name}
        />
      ))}
    </select>
    {selectValidation 
      && <strong>
        Please choose a user
      </strong>}
  </>

);

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  selectValidation: PropTypes.bool.isRequired,
  names:PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};
