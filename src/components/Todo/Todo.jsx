import React, { useState } from 'react';
import './Todo.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export function Todo({ title, completed, userId }) {
  const [todoIsCompleted, checkTodo] = useState(completed);

  const handleChange = (event) => {
    const input = event.target;

    input.checked = !input.checked;
    checkTodo(!todoIsCompleted);
  };

  return (
    <div className={classNames('todo', { completed: todoIsCompleted })}>
      <input
        type="checkbox"
        className="checkbox"
        checked={todoIsCompleted}
        onChange={handleChange}
      />
      <span>{`UserID: ${userId}`}</span>
      <span>Task:</span>
      <span>
        <strong>{title}</strong>
      </span>
    </div>
  );
}

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  userId: PropTypes.number.isRequired,
};
