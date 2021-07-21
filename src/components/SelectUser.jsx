import React from 'react';
import PropTypes from 'prop-types';
import { Option } from './Option';

export const SelectUser = ({
  namesForOptions,
  onChange,
  valueForSelect,
}) => (
  <select

    name="userNames"
    required
    onChange={onChange}
    value={valueForSelect}
  >
    <option
      value=""
    >
      Select user
    </option>
    {namesForOptions.map(name => (
      <Option
        name={name}
        key={name}
      />
    ))}
  </select>
);

SelectUser.propTypes = {
  namesForOptions:
    PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onChange: PropTypes.func.isRequired,
  valueForSelect: PropTypes.string.isRequired,
};
