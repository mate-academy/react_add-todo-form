import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

import './TodoList.scss';

type Props = {
  preparedTodos: Todo[];
};

export const TodoList: React.FC<Props> = ({ preparedTodos }) => (
  <ul className="preparedTodos">
    {preparedTodos.map(todo => (
      <li key={todo.id} className="preparedTodos__item">
        <TodoInfo {...todo} />
      </li>
    ))}
  </ul>
);
