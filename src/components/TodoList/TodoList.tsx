import React from 'react';
import { PreparedTodos } from '../../react-app-env';
import './TodoList.css';

type Props = {
  preparedTodos: PreparedTodos[]
};

export const TodoList: React.FC<Props> = ({ preparedTodos }) => {
  return (
    <ul className="list">
      {preparedTodos.map(todo => (
        <li key={todo.id} className="item">
          <p>{todo.user?.name}</p>
          <p>{todo.user?.email}</p>
          <p>{todo.title}</p>
          <p>
            {todo.completed
              ? 'Completed'
              : 'Not completed'}
          </p>
        </li>
      ))}
    </ul>
  );
};
