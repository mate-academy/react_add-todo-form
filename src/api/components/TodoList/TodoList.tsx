import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';

import './TodoList.scss';

import { Todo } from '../types/Todo';

type Props = {
  preparedTodos: Todo[];
};

export const TodoList: React.FC<Props> = ({ preparedTodos }) => {
  return (
    <ul className="TodoList">
      {preparedTodos.map(todo => (
        <li key={todo.id}>
          <TodoInfo {...todo} />
        </li>
      ))}
    </ul>
  );
};
