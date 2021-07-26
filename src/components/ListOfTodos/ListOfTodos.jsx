import React from 'react';
import propTypes, { arrayOf } from 'prop-types';
import { Todo } from '../Todo';
import { UserType } from '../../Types';

export const TodoList = ({ usersWithTodos }) => (
  <table className="todoList">
    <thead className="todoList__header">
      <tr>
        <td>ID</td>
        <td>Description of TODO</td>
        <td>Status</td>
        <td>User name</td>
      </tr>
    </thead>

    <tbody className="todoList__body">
      {usersWithTodos.map(user => (
        <Todo user={user} key={user.id} />
      ))}
    </tbody>
  </table>
);

TodoList.propTypes = {
  usersWithTodos: arrayOf(propTypes.shape(UserType)).isRequired,
};
