import React from 'react';
import PropTypes from 'prop-types';

import { Card } from '../Card';

import './UsersList.scss';

export const UsersList = React.memo(({ users, todos }) => {
  const usersWithTodos = users.filter(user => (
    todos.some(todo => todo.userId === user.id)
  ));

  return (

    <ul className="users-list">
      {
        usersWithTodos.map((user) => {
          const userTodos = todos.filter(todo => todo.userId === user.id);

          return (
            <li key={user.id}>
              <Card user={user} todosList={userTodos} />
            </li>
          );
        })
      }
    </ul>

  );
});

UsersList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};
