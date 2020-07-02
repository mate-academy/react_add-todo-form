import React from 'react';
import { ShapeTodo } from './Shapes';
import { User } from './User';

export const Todo = ({ todo, handleStatus, userId }) => (
  <tr>
    <td>
      <input
        type="checkbox"
        id={todo.id}
        onChange={e => handleStatus(e.target.id)}
      />
    </td>
    <td>{userId}</td>
    <td className={todo.completed ? 'active' : ''}>
      {todo.title[0].toUpperCase() + todo.title.substring(1)}
    </td>
    <User name={todo.user.name} />
  </tr>
);

Todo.propTypes = ShapeTodo;
