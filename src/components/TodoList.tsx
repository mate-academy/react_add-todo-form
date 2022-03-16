import React from 'react';

import './TodoList.scss';

import { TodoInfo } from './TodoInfo';
import { UserInfo } from './UserInfo';

import { Todo } from '../api/todo';

type Props = {
  users: Todo[]
};

export const TodoList: React.FC<Props> = ({ users }) => (
  <ul className="todo__list">
    {users.map(todo => (
      <li className="todo__item" key={todo.id}>
        {todo.user
          && <UserInfo user={todo.user} />}
        <TodoInfo todo={todo} />
      </li>
    ))}
  </ul>
);
