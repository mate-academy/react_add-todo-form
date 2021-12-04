import React from 'react';
import { TodoInfo } from './TodoInfo';
import { UserInfo } from './UserInfo';
import { Todos } from '../types/Todos';

type Props = {
  preparedTodos: Todos[],
};

export const TodoList:React.FC<Props> = ({ preparedTodos }) => (
  <table className="table">
    <thead className="tableHead">
      <tr>
        <th>Id</th>
        <th>Title</th>
        <th>Name</th>
        <th>User Name</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody className="tableBody">
      {preparedTodos.map(todo => (
        <tr key={todo.id}>
          <TodoInfo todo={todo} />
          {todo.user && (<UserInfo user={todo.user} />)}
        </tr>
      ))}
    </tbody>
  </table>
);
