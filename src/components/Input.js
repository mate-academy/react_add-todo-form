import React from 'react';
import PropTypes from 'prop-types';
import { Error } from './Error';

export const Input = ({ task, onChange, titleError }) => (
  <div>
    <label>
      To do (only letters and numbers allowed)
      <input
        placeholder="write a task"
        name="task"
        type="text"
        value={task}
        onChange={onChange}
        className="form-control"
      />
    </label>

    {titleError
      ? <Error text="Please enter the task" />
      : ''}
  </div>
);

Input.propTypes = {
  task: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  titleError: PropTypes.bool.isRequired,
};
