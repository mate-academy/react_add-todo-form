import React from 'react';
import './TodoItem.css';

export const TodoItem = ({ todo }) => (
  <tr>
    <th scope="row">{todo.id}</th>
    <td>{todo.user.name}</td>
    <td>{todo.title}</td>
    <td>{todo.completed ? '\u2714' : '\u2718'}</td>
  </tr>
);
