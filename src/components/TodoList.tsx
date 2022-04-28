import React from 'react';
import { TodoInfo } from './TodoInfo';
import { Todo } from '../types/todo';

import './TodoList.scss';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className="todo-item">
            <TodoInfo
              title={todo.title}
              completed={todo.completed}
              user={todo.user}
            />
          </li>
        ))}
      </ul>
    </>
  );
};
