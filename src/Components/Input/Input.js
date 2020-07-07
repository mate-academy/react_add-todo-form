import React from 'react';
import PropTypes from 'prop-types';

export const Input = ({ value, onChange, name }) => (
  <label>
    <input
      type="text"
      name={name}
      placeholder="What do you want to do ?"
      onChange={({ target }) => onChange(target.name, target.value)}
      value={value}
    />
  </label>
);

Input.defaultProps = {
  value: '',
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
};
