import React from 'react';

 import User from './User';
 import './todoItem.css'

 const TodoItem = ({ todo }) => (
  <tr>
    <td>{todo.id}</td>
    <User
      visibleUser={todo.user}
    />
    <td className="todolist-table__task">
      {todo.title}
    </td>
    <td className="todolist-table__status">
      {todo.completed
        ? <input type="checkbox" checked/>
        : <input type="checkbox"/> }
    </td>
  </tr>
);

 export default TodoItem;
