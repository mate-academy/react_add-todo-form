import React from 'react';
import PropTypes from 'prop-types';

export const InputForTitle = ({ onChange, value }) => (
  <label>
    <strong>
      Title:
    </strong>
    <input
      type="text"
      maxLength="40"
      required
      name="todoTitle"
      placeholder="title"
      onChange={onChange}
      value={value}
    />
  </label>
);

InputForTitle.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}
