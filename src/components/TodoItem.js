import React from 'react';
import User from './User';

function TodoItem({ todo }) {
  return (
    <tr className="warning">
      <td>{todo.id}</td>
      <td>{todo.title}</td>
      <User user={todo.user} />
    </tr>
  );
}

export default TodoItem;
