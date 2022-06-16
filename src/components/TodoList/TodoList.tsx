import React from 'react';
import { PreparedTodos } from '../../Types/Types';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  preparedTodos: PreparedTodos[];
};

export const TodoList:React.FC<Props> = ({ preparedTodos }) => (
  <ul>
    {preparedTodos.map(preparedTodo => (
      <li className="box" key={preparedTodo.id}>
        <TodoInfo todo={preparedTodo} />
      </li>
    ))}
  </ul>
);
