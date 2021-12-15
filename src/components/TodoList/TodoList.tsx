import React from 'react';
import { Todo } from '../../types/types';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import './TodoList.scss';

type Props = {
  preparedTodos: Todo[],
};

export const TodoList: React.FC<Props> = ({ preparedTodos }) => {
  return (
    <ul className="TodoList">
      {preparedTodos.map(todo => (
        <li key={todo.id} className="TodoList__item">
          <TodoInfo todo={todo} />
        </li>
      ))}
    </ul>
  );
};
