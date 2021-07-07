import React from 'react';
import PropTypes from 'prop-types';
import { Options } from './Options';
import { OptionsShape } from '../utils/Shapes';

export const Select = (props) => {
  const { onChange, selectValue, options, onActive } = props;
  const localOnChange = event => (
    onActive(event) || onChange(event.target.value)
  );

  return (
    <select
      className="select"
      name="select"
      value={selectValue}
      onChange={localOnChange}
    >
      <option value="0" disabled>Choose a manager</option>
      <Options data={options} />
    </select>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(OptionsShape).isRequired,
  onChange: PropTypes.func.isRequired,
  onActive: PropTypes.func.isRequired,
  selectValue: PropTypes.string.isRequired,
};
