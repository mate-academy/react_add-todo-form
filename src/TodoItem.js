import React from 'react';

 import User from './User';

 const TodoItem = ({ todo }) => (
  <tr>
    <td>{todo.id}</td>
    <User
      visibleUser={todo.user}
    />
    <td>
      {todo.title}
    </td>
    <td className="table__status">
      {
        todo.completed
        ? <input type="checkbox" checked/>
        : <input type="checkbox"/>
      }
    </td>
  </tr>
);

 export default TodoItem;
