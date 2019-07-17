import React from 'react';

import User from './User';

const TodoItem = ({ todo }) => (
  <tbody>
    <tr>
      <td>{todo.id}</td>
      <td>
        <input className="form-check" type="checkbox"
          id={todo.id}
          defaultChecked={todo.completed} />
      </td>
      <td>{todo.title}</td>
      <td><User user={todo.user} /></td>
    </tr>
  </tbody>
);

export default TodoItem
