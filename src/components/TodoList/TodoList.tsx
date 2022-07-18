import React from 'react';
import { PreparedToDo } from '../../types/PreparedToDo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  preparedTodos: PreparedToDo[];
};

export const TodoList: React.FC<Props> = ({ preparedTodos }) => {
  return (
    <ul className="todolist">
      {preparedTodos.map(preparedToDo => (
        <li className="card" key={preparedToDo.id}>
          <TodoInfo preparedToDo={preparedToDo} />
        </li>
      ))}
    </ul>
  );
};
