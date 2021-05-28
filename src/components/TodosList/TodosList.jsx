import React from 'react';
import PropTypes from 'prop-types';

export const TodosList = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <li key={todo.id}>
        {`${todo.title} - ${todo.user} `}
      </li>
    ))}
  </ul>
);

TodosList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
};
