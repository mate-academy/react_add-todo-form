import React from 'react';
import { Todo } from '../types/Todo';

export const TodoList: React.FC<{ todos: Todo[] }> = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <li key={todo.id}>
        {todo.title}
        <p>{todo.completed}</p>
      </li>
    ))}
  </ul>
);
