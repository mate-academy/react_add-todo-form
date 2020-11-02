import React from 'react';
import PropTypes from 'prop-types';
import './Todo.css';

const Todo = ({ user, title, completed }) => (
  <div className={`todo-list__todo todo ${completed ? 'completed' : ''}`}>
    <p className="todo__user">
      {user.name}
    </p>
    <h1 className="todo__title">
      {title}
    </h1>
    <p className="todo__status">
      Completed:&nbsp;
      {completed ? '+' : '-'}
    </p>
  </div>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  completed: PropTypes.bool.isRequired,
};

export { Todo };
