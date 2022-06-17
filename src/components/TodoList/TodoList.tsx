import React from 'react';
import './TodoList.scss';

import { ToDo } from '../../interfaces/ToDo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  preparedTodos: ToDo[],
}

export const TodoList: React.FC<Props> = ({ preparedTodos }) => (
  <div className="todo-list">
    {preparedTodos.map((todo) => (
      <TodoInfo key={todo.id} card={todo} />
    ))}
  </div>
);
