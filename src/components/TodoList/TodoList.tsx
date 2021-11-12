import React from 'react';
import './TodoList.scss';

interface Props {
  todos: Todo[],
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li
          className="todo-list__item"
          key={todo.id}
        >
          <p className="todo-list__item-title">
            {todo.title}
          </p>

          <p>
            Todo ID:
            {' '}
            {todo.id}
          </p>

          <p>
            User ID:
            {' '}
            {todo.userId}
          </p>
        </li>
      ))}
    </ul>
  );
};
