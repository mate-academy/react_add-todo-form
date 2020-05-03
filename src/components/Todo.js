import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

const Todo = ({ id, user, title, completed, changeTodoStatus }) => (
  <li className={completed ? 'light' : 'dark'}>
    <span className="card_number">{id}</span>
    <div className="task-checkbox">
      <label htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          checked={completed}
          onChange={() => changeTodoStatus(id)}
        />
      </label>
    </div>
    <User user={user} />
    <p className="task-title">
      To-do:
    </p>
    <p className="task-value">{title}</p>
  </li>
);

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  changeTodoStatus: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Todo;
