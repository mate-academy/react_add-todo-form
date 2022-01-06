import React from 'react';
import { Todos } from '../types/Todos';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import './TodoList.scss';

type Props = {
  preparedTodos: Todos[],
};

export const TodoList: React.FC<Props> = ({ preparedTodos }) => (
  <table>
    <thead>
      <tr>
        <th>Todo</th>
        <th>Status</th>
        <th>Responsible person</th>
        <th>Person&apos;s email</th>
        <th>{}</th>
      </tr>
    </thead>
    <tbody>
      {preparedTodos.map(todo => (
        <tr
          key={todo.id}
          className={todo.completed === true ? ('todo__status--completed') : ('todo__status')}
        >
          <TodoInfo todo={todo} />
        </tr>
      ))}
    </tbody>
  </table>
);
