import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ inputValue, handleInputChange }) => (
  <label htmlFor="input">
    Title:
    <input
      id="input"
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      required
      maxLength={20}
    />
  </label>
);

Input.propTypes = {
  inputValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default Input;
