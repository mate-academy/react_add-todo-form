import React from 'react';
import './TodoList.css';
import PropTypes from 'prop-types';

import { Todo } from '../Todo/Todo';

export const TodoList = ({ todos }) => (
  <ul className="todos">
    {todos.map(todo => (
      <li key={todo.id} className="todo">
        <Todo {...todo} />
      </li>
    ))}

  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number,
      title: PropTypes.string,
    }).isRequired,
  ).isRequired,
};
