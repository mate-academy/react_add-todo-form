import React from 'react';
import PropTypes from 'prop-types';

export const TodoList = ({ todos }) => (
  <ol>
    {todos.map(todo => (
      <li key={todo.id}>
        {todo.title}
        <p>{todo.user.name}</p>
        <hr />
      </li>
    ))}
  </ol>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
};
