import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '../../App.scss';

export const TodoList = ({ todos, changeStatus }) => (
  <div className="todo__list">
    {todos.map(todo => (
      <div
        key={todo.id}
        className={classNames({
          todo: true,
          'todo--done': todo.completed,
        })}
      >
        <p className="todo__paragraph">{todo.user.name}</p>
        <div>
          <span className="todo__paragraph">Todo:</span>
          {todo.title}
        </div>
        <button
          type="button"
          className="todo__button"
          onClick={() => changeStatus(todo.id, true)}
        >
          <span role="img" aria-label="check-mark">✅</span>
          {' '}
          Done
        </button>
        {' '}
        <button
          type="button"
          className="todo__button"
          onClick={() => changeStatus(todo.id, false)}
        >
          <span role="img" aria-label="clock">🕑</span>
          {' '}
          In Process
        </button>
      </div>
    ))}
  </div>
);

TodoList.propTypes = {
  changeStatus: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
};
