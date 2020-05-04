import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '../../App.scss';

export const TodoList = ({ todos, changeStatusTrue, changeStatusFalse }) => (
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
          onClick={() => changeStatusTrue(todo.id)}
        >
          <span role="img" aria-label="check-mark">✅</span>
          {' '}
          Done
        </button>
        {' '}
        <button
          type="button"
          className="todo__button"
          onClick={() => changeStatusFalse(todo.id)}
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
  changeStatusFalse: PropTypes.func.isRequired,
  changeStatusTrue: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
};
