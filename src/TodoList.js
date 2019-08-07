import React from 'react';

const TodoList = ({ todo }) => (
  <tr>
    <td>{todo.id}</td>
    <td>{todo.title}</td>
    <td>{todo.name}</td>
    <td><input type="checkbox" /></td>
  </tr>
);

export default TodoList;
