import React from 'react';
import PropTypes from 'prop-types';

import { Todo } from '../Todo';

import './UserTodos.scss';

export const UserTodos = ({ userTodos, statusToggle }) => (

  <ul className="todos">
    {userTodos.map(todo => (
      <li key={todo.id} className="todos-list__item todo">
        <Todo
          todo={todo}
          statusToggle={statusToggle}
        />
      </li>
    ))}
  </ul>
);

UserTodos.propTypes = {
  userTodos: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  statusToggle: PropTypes.func.isRequired,
};
