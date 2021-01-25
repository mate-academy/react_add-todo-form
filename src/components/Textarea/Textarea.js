import React from 'react';
import PropTypes from 'prop-types';

export const Textarea = ({ value, addTitle }) => (
  <textarea
    className="form__textarea"
    placeholder="Enter your task"
    value={value}
    onChange={addTitle}
  />
);

Textarea.propTypes = {
  value: PropTypes.string.isRequired,
  addTitle: PropTypes.func.isRequired,
};
