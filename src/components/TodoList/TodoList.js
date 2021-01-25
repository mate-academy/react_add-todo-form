import React from 'react';
import PropTypes from 'prop-types';

import { Todo } from '../Todo';

export const TodoList = ({ todos }) => (
  <ul className="list-group">
    {
      todos.map(todo => (
        <li
          key={todo.id}
          className="list-group-item
            list-group-item-action
            list-group-item-secondary"
        >
          <Todo {...todo} />
        </li>
      ))
    }
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    }),
  ).isRequired,
};
