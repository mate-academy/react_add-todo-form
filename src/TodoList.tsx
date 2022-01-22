import React from 'react';
import { Todo } from './Types';

export const TodoList: React.FC<{ todos: Todo[] }> = ({ todos }) => {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.title}
          <br />
          {todo.user?.name}
          {' '}
          {todo.user?.username}
          {' '}
          {todo.user?.email}
        </li>
      ))}
    </ul>
  );
};
