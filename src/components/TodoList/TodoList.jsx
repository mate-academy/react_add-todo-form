import React from 'react';
import PropTypes from 'prop-types';

export const TodoList = ({ todos }) => (
  <ul>
    {todos.length ? (todos.map(todo => (
      <li key={todo.id}>
        {todo.id}
        .
        {' '}
        {todo.title}
        {' '}
        |
        {' '}
        {todo.userName}
      </li>
    ))) : 'there are no todos'}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};
