import React from 'react';
import { Todo } from '../types/TodoTypes';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="todoList">
      {todos.map((todo) => (
        todo.user
        && (
          <li
            className="todoList__item"
            key={todo.id}
          >
            {todo.user.name}

            <div className="todoList__todo-title">
              {todo.title}
            </div>
          </li>
        )
      ))}
    </ul>
  );
};
