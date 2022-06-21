import React from 'react';
import { PreparedTodo } from '../../app.typedefs';
import { TodoInfo } from '../TodoInfo';
import './TodoList.scss';

interface Props {
  preparedTodos: PreparedTodo[],
}

export const TodoList: React.FC<Props> = ({ preparedTodos }) => {
  return (
    <ul className="list">
      {preparedTodos.map((todo) => {
        return (
          <li
            className="list__item"
            key={todo.id}
          >
            <TodoInfo todo={todo} />
          </li>
        );
      })}
    </ul>
  );
};
