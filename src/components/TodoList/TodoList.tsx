import React from 'react';
import './TodoList.css';
import { Todo } from '../../types/Todo';

type Props = {
  preparedTodos: Todo[],
};

export const TodoList:React.FC<Props> = ({ preparedTodos }) => (
  <table className="table">
    <tr>
      <th className="header-cell">id</th>
      <th className="header-cell">Title</th>
      <th className="header-cell">UserId</th>
      <th className="header-cell">UserName</th>
    </tr>
    {preparedTodos.map(todo => (
      <tr key={todo.id}>
        <td className="data-cell">{todo.id}</td>
        <td className="data-cell">{todo.title}</td>
        {todo.userId && (
          <td className="data-cell">{todo.userId}</td>
        )}
        {todo.user && (
          <td className="data-cell">{todo.user.name}</td>
        )}
      </tr>
    ))}
  </table>
);
