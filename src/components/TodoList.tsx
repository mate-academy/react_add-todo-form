import React from 'react';
import { Todo } from '../types/Todo';
import { TodoInfo } from './TodoInfo';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="todo__list">
      {todos.map(todo => {
        return (
          <li className="todo__item" key={todo.id}>
            <TodoInfo
              title={todo.title}
              completed={todo.completed}
              user={todo.user}
            />
          </li>
        );
      })}
    </ul>
  );
};
