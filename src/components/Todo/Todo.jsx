import React from 'react';
import propTypes from 'prop-types';
import { UserType } from '../../Types';

export const Todo = ({ user }) => {
  const { name, todos } = user;

  return (
    <>
      {todos.map(todo => (
        <tr key={todo.id}>
          <th>
            {todo.id}
          </th>
          <td>
            {name}
          </td>
          <td>
            {todo.title}
          </td>
          <td>
            {todo.completed ? 'Completed' : 'Not completed yet'}
          </td>
        </tr>
      ))}
    </>
  );
};

Todo.propTypes = {
  user: propTypes.shape(UserType).isRequired,
};
