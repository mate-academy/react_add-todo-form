import React from 'react';
import { Todo } from '../../types/Todo';
import './Todolist.css';

interface Props {
  todos: Todo[],
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="todo-list">
      {todos.map(({ id, title, userId }) => (
        <li
          className="todo"
          key={id}
        >
          <span className="todo__title">
            {title}
          </span>
          <p className="todo__id">
            Todo ID:
            {' '}
            {id}
            <br />
            User ID:
            {' '}
            {userId}
          </p>
        </li>
      ))}
    </ul>
  );
};
