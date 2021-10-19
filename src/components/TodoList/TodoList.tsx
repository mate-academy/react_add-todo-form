import React from 'react';
import './TodoList.scss';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';
import { UserInfo } from '../UserInfo';

export const TodoList: React.FC<{ todos: Todo[] }> = ({ todos }) => {
  return (
    <ul
      className="todo-list"
    >

      {todos.map(({
        id,
        completed,
        title,
        user,
      }) => {
        return user && (
          <li
            key={id}
            className="todo-list__item"
          >
            <TodoInfo
              title={title}
              status={completed}
            />
            <UserInfo
              user={user}
            />
          </li>
        );
      })}
    </ul>
  );
};
