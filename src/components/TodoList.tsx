import React from 'react';
import { Todo } from './types/Todo';

import './TodoList.scss';
import { TodoInfo } from './TodoInfo/TodoInfo';

type Props = {
  preparedTodos: Todo[];
};

export const TodoList: React.FC<Props> = ({ preparedTodos }) => (
  <ul className="TodoList">
    {preparedTodos.map(element => (
      <li key={element.id} className="TodoList__item">
        <TodoInfo todo={element} />
      </li>
    ))}
  </ul>
);
