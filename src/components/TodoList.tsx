import React from 'react';
import { Todo } from '../types/Todo';
import { TodoInfo } from './TodoInfo';

type Props = {
  preparedTodos: Todo[];
};

export const TodoList: React.FC<Props> = ({ preparedTodos }) => (
  <ul className="todos__todo">
    {preparedTodos.map(todo => (
      <li key={todo.id} className="todos__item">
        <TodoInfo todo={todo} />
      </li>
    ))}
  </ul>
);
