import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { UserInfo } from '../UserInfo/UserInfo';
import '../../App.scss';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos = [] }) => (
  <ul>
    {todos.map(({
      userId, title, completed, user,
    }) => (
      <li
        key={userId}
      >
        <TodoInfo
          title={title}
          completed={completed}
        />

        {user && <UserInfo user={user} />}
      </li>
    ))}
  </ul>
);
