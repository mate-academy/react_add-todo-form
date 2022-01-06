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
    <div className="todoContainer">
      {preparedTodos.map(todo => (
        <div className="todoItem" key={todo.id}>
          <TodoInfo todo={todo} deleteTodo={deleteTodo} />
        </div>
      ))}
    </div>
  );
};
