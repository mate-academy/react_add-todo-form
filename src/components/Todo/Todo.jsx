import React from 'react';
import './Todo.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Todo({ id, completed, title, user, changeStatus }) {
  const changeStatusHandler = (todoId) => {
    changeStatus(todoId);
  };

  return (
    <div className="todo">
      <button
        type="button"
        className={classNames('todo-status', { completed })}
        onClick={() => changeStatusHandler(id)}
      >
        {completed ? '✔' : '❌' }
      </button>
      <div className="todo-title">{title}</div>
      <div className="userName">
        {user.name}
      </div>
    </div>
  );
}

Todo.propTypes = {
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  changeStatus: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default Todo;
