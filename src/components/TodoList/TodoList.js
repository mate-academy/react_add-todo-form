import React from 'react';
import PropTypes from 'prop-types';
import '../../App.scss';

export const TodoList = ({ todos, changeStatusTrue, changeStatusFalse }) => (
  <div className="todo__list">
    {todos.map(todo => (
      <div
        key={todo.id}
        className={todo.completed
          ? 'todo todo--done'
          : 'todo'}
      >
        <p>
          <b>{todo.user.name}</b>
        </p>
        <p>
          <b>Todo:</b>
          {' '}
          {todo.title}
        </p>
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
