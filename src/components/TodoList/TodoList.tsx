import React from 'react';
import { Todo } from '../../Types';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { UserInfo } from '../UserInfo/UserInfo';

export const TodoList: React.FC<{ todos:Todo[] }> = ({ todos }) => (
  <>
    <ul className="todo__list">
      {todos.map((todo) => (
        <li className="todo__item">
          <UserInfo {...todo} />
          <TodoInfo {...todo} />
        </li>
      ))}
    </ul>
  </>
);
