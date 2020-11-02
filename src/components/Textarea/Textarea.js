import React from 'react';
import PropTypes from 'prop-types';

export const Textarea = ({ title, addTitle }) => (
  <textarea
    className="form__textarea"
    placeholder="Enter your task"
    value={title}
    onChange={addTitle}
  />
);

Textarea.propTypes = {
  title: PropTypes.string.isRequired,
  addTitle: PropTypes.func.isRequired,
};
