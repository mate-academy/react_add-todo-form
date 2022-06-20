import React from 'react';
import { PreparedTodos } from '../../app.typedefs';
import { TodoInfo } from '../TodoInfo/TodoInfo';

interface Props {
  preparedTodos: PreparedTodos[];
}

export const TodoList: React.FC<Props> = ({ preparedTodos }) => {
  return (
    <ul>
      {preparedTodos.map(todo => {
        return (
          <li key={todo.id}>
            <TodoInfo todo={todo} />
          </li>
        );
      })}
    </ul>
  );
};
