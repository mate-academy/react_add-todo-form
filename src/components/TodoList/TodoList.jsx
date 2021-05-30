import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';

export const TodoList = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <li key={todo.id}>
        <Todo {...todo} />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
