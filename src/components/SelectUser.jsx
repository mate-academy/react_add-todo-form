import React from 'react';
import PropTypes from 'prop-types';
import { Option } from './Option';

export const SelectUser = ({
  onChange,
  valueForSelect,
  selectValidation,
  names
}) => (
  <>
    <select
      name="userNames"
      onChange={onChange}
      value={valueForSelect}
    >
      <option
        value=""
      >
        Select user
      </option>
      {names.map(name => (
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

SelectUser.propTypes = {
  onChange: PropTypes.func.isRequired,
  valueForSelect: PropTypes.string.isRequired,
};
