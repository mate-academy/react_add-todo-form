import React from 'react';
import PropTypes from 'prop-types';

export const TodoList = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <li key={todo.id}>
        <p>
          <strong>user id:</strong>
          {` ${todo.userId}`}
        </p>
        <p>
          <strong>Todo id:</strong>
          {` ${todo.id}`}
        </p>
        <p>
          <strong>Title:</strong>
          {` ${todo.title}`}
        </p>
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
