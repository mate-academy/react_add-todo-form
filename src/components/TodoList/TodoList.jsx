import React from 'react';
import PropTypes, { shape } from 'prop-types';

export const TodoList = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <li key={todo.id}>
        {`Owner: ${todo.ownerName} | `}
        {`Title: ${todo.title}`}
        {` | Completed: ${todo.completed ? 'Yep' : 'Nope'}`}
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    ownerName: PropTypes.string.isRequired,
  })).isRequired,
};
