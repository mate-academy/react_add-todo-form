import React from 'react';
import { TodoInfo } from './TodoInfo';

import { ListProps } from '../types';

export const TodoList: React.FC <ListProps> = ({ todos }) => (
  <ul className="list container__list">
    {todos.map(todo => (
      <li key={todo.id} className="list__item">
        <TodoInfo todo={todo} />
      </li>
    ))}
  </ul>
);
