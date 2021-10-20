import React from 'react';
import { Todo } from '../types/TodoType';

type Props = {
  tasks: Todo[];
};

export const TodoList: React.FC<Props> = ({ tasks }) => {
  return (
    <ul className="todoList">
      {tasks.map((todo) => (
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
