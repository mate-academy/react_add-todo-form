import React from 'react';

import PropTypes from 'prop-types';
import { Todo } from '../Todo';
import '../TodoList/TodoList.css';

export const TodoList = ({ todos }) => (
  <ul>
    { todos.map(todo => (
      <li key={todo.id} className="list">
        <Todo {...todo} />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape(),
  ).isRequired,
};
