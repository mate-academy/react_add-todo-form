import React from 'react';
import PropTypes from 'prop-types';

export const Input = ({ maxLength, value, action }) => (
  <input
    maxLength={`${maxLength}`}
    className="form-control"
    value={value}
    onChange={action}
    placeholder={`Task name (limit: ${maxLength} symbols)`}
  />
);

Input.propTypes = {
  value: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  maxLength: PropTypes.number.isRequired,
};
