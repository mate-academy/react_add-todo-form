import React from 'react';
import classNames from 'classnames';
import { Todos } from '../types/Todos';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import './TodoList.scss';

type Props = {
  preparedTodos: Todos[],
  removeTodo: (id: number) => void,
};

export const TodoList: React.FC<Props> = ({ preparedTodos, removeTodo }) => (
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
          className={classNames('todo__status', { 'todo__status--completed': todo.completed })}
        >
          <TodoInfo todo={todo} removeTodo={removeTodo} />
        </tr>
      ))}
    </tbody>
  </table>
);
