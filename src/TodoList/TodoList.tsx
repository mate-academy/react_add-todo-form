import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';

import './TodoList.scss';

type Props = {
  preparedTodos: {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }[],
  deleteTodo: any,
};

export const TodoList: React.FC<Props> = ({ preparedTodos, deleteTodo }) => {
  return (
    <ul className="todoContainer">
      {preparedTodos.map(todo => (
        <li className="todoItem" key={todo.id}>
          <TodoInfo todo={todo} deleteTodo={deleteTodo} />
        </li>
      ))}
    </ul>
  );
};
