import React from 'react';
import PropTypes from 'prop-types';

const check = (event) => {
  const parent = event.target.parentElement;

  event.target.checked
    ? parent.className += ' checked'
    : parent.className = 'todo';
};

export const Todos = ({ todos }) => (
  todos.map(todo => (
    <label key={todo.id}>
      <div className="todo">
        <input
          type="checkbox"
          onClick={event => check(event)}
        />
        <h1>{todo.id}</h1>
        <h3>{todo.title}</h3>
        <p>
          User id:
          {todo.userId}
        </p>
      </div>
    </label>
  ))
);

Todos.proptypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
