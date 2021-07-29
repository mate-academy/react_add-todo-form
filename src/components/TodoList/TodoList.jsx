import React from 'react';
import PropTypes from 'prop-types';

import { Todo } from '../Todo';

export function TodoList({ todos }) {
  return (
    <ul className="list-group">
      {todos.map((todo) => {
        const { id, title, status, user } = todo;

        return (
          <li key={id} className="list-group-item">
            <Todo
              title={title}
              status={status}
              user={user}
            />
          </li>
        );
      })}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};
