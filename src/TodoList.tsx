import React from 'react';
import { Todo } from './Todo';
import { TodoInfo } from './TodoInfo';
import { UserInfo } from './UserInfo';

export type Props = {
  preparedTodos: Todo[]
};

export const TodoList: React.FC<Props> = ({ preparedTodos }) => (
  <ul className="todo">
    {preparedTodos.map(todoItem => (
      <li className="todo__item" key={todoItem.id}>
        <TodoInfo todo={todoItem} />
        {todoItem.user && <UserInfo user={todoItem.user} />}
      </li>
    ))}
  </ul>
);
