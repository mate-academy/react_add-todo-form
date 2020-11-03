import React from 'react';
import PropTypes from 'prop-types';

export const InputForm = ({ inputValue, addChange }) => (
  <input
    className="ui selection dropdown"
    type="text"
    placeholder="write here"
    value={inputValue}
    onChange={addChange}
  />
);

InputForm.propTypes = {
  inputValue: PropTypes.string.isRequired,
  addChange: PropTypes.func.isRequired,
};
