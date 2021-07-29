import React from 'react';
import propTypes, { arrayOf } from 'prop-types';
import { Todo } from '../Todo';
import { UserType } from '../../Types';

export const TodoList = ({ usersWithTodos }) => (
  <table className="table is-bordered is-striped is-narrow is-hoverable">
    <thead>
      <tr>
        <th>ID</th>
        <th>User</th>
        <th>Task</th>
        <th>Status</th>
      </tr>
    </thead>

    <tbody>
      {usersWithTodos.map(user => (
        <Todo user={user} key={user.id} />
      ))}
    </tbody>
  </table>
);

TodoList.propTypes = {
  usersWithTodos: arrayOf(propTypes.shape(UserType)).isRequired,
};
