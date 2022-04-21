import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';

import './TodoList.scss';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos = [] }) => (
  <ul className="todo__list">
    {todos.map(todo => (
      <li
        key={todo.id}
        className="todo__item"
      >
        <TodoInfo
          title={todo.title}
          completed={todo.completed}
        />

        {todo.user && (
          <UserInfo
            user={todo.user}
          />
        )}
      </li>
    ))}
  </ul>
);
