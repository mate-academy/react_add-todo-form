import React from 'react';
import { PreparedTodo } from '../../react-app-env';
import './TodoList.scss';

interface Props {
  preparedTodos: PreparedTodo[],
}

export const TodoList : React.FC<Props> = ({
  preparedTodos,
}) => (
  <ul className="list">
    {preparedTodos.map((todo: PreparedTodo) => (
      <li
        key={todo.id}
        className="list_item"
      >
        <h5>
          {todo.user?.name}
        </h5>
        <div>
          <input
            type="checkbox"
            checked={todo.completed}
          />
          {todo.title}
        </div>
      </li>
    ))}
  </ul>
);
