import React from 'react';
import TodoInfo from './TodoInfo';
import { Todo } from '../types';

type Props = {
  preparedTodos: Todo[],
};

export const TodoList: React.FC<Props> = ({ preparedTodos }) => (
  <ul className="todo">
    {preparedTodos.map(todo => (
      <li className="todoItem" key={todo.id}>
        <TodoInfo todo={todo} />
      </li>
    ))}
  </ul>
);
