import React from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

export const Input = ({ name, value, onChange }) => (
  <label htmlFor={name}>
    <input
      type="text"
      name={name}
      id={name}
      placeholder="Enter new task"
      value={value}
      onChange={onChange}
      className="input"
    />
  </label>
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
