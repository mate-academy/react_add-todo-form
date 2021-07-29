import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';

export function TodoList({ todos }) {
  return (
    <ol>
      {
        todos.map(todo => (
          <li key={todo.id}>
            <Todo {...todo} />
          </li>
        ))
      }
    </ol>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};
