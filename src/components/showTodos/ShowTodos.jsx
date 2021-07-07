import React from 'react';
import PropTypes from 'prop-types';
import './ShowTodos.css';

export const ShowTodos = ({ todos }) => (
  <div className="todos">
    {todos.map(todo => (
      <div
        className="todos__todo"
        key={todo.id}
      >
        <div>{todo.id}</div>
        <p className="todos__head">
          User ID:
          {' '}
          <span className="todos__value">{todo.userId}</span>
        </p>
        <h4
          className="todos__value"
        >
          {todo.user.name}
        </h4>
        <p className="todos__head">
          Title:
        </p>
        {' '}
        <p className="todos__value">{todo.title}</p>
      </div>
    ))}
  </div>
);

ShowTodos.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};
