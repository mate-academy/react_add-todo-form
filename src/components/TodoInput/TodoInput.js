import React from 'react';
import PropTypes from 'prop-types';
import './TodoInput.css';

const TodoInput = ({ handleTaskChange, task }) => (
  <input
    type="text"
    value={task}
    placeholder="Write your task"
    maxLength="25"
    onChange={handleTaskChange}
    className="App__input"
    required
  />
);

TodoInput.propTypes = {
  handleTaskChange: PropTypes.func.isRequired,
  task: PropTypes.string.isRequired,
};

export default TodoInput;
