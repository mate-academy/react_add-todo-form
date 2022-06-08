import React from 'react';
import { Todo } from '../Todo';

type Props = {
  preparedTodos: FullTodos[],
};

export const TodoList: React.FC<Props> = ({ preparedTodos }) => (
  <div className="container">
    <ul className="list">
      {preparedTodos.map(todo => (
        <li
          className="list-item"
          key={todo.id}
        >
          <Todo todo={todo} />
        </li>
      ))}
    </ul>
  </div>

);
