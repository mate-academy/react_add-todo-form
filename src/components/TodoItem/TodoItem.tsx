import React from 'react';

import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => (
  <li className="TodoItem">
    <div className="TodoItem__user-info">
      {todo.user && <UserInfo user={todo.user} />}
    </div>

    <div className="TodoItem__todo-info">
      <p className="TodoItem__todo-title">{todo.title}</p>
      <p className="TodoItem__todo-status">
        {todo.completed ? 'Completed' : 'Not completed'}
      </p>
    </div>
  </li>
);
