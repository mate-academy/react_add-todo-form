import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TodoItem.css';

const TodoItem = ({ title, user, id, completed, handleCompleted }) => {
  const todoItemClass = classNames('todo-item ', { completed });

  return (
    <button
      type="button"
      className={todoItemClass}
      onClick={() => handleCompleted(id)}
    >
      <span className="task-title">{title}</span>
      <span className="task-user">{user.name}</span>
    </button>
  );
};

export default TodoItem;

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  handleCompleted: PropTypes.func.isRequired,
};
