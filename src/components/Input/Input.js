import React from 'react';
import PropTypes from 'prop-types';

import './Input.scss';

export const Input = ({ value, onChange }) => (
  <input
    className="form-control"
    placeholder="Write your task"
    maxLength="30"
    id="newTaskTitle"
    type="text"
    name="newTask"
    value={value}
    onChange={onChange}
  />
);

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
