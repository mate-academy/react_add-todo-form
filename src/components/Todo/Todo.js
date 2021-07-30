import React from 'react';
import { TodoTypes } from '../../types';

export const Todo = ({ todo }) => (
  <>
    <th scope="row">{todo.id}</th>
    <td>{todo.title}</td>
    <td>{todo.completed ? 'Completed!' : 'Not completed!'}</td>
    <td>{todo.user}</td>
  </>
);

Todo.propTypes = {
  todo: TodoTypes.isRequired,
};
