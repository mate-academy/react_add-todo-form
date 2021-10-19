import React from 'react';
import './TodoList.css';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="list">
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.title}
        </li>
      ))}
    </ul>
  );
};
