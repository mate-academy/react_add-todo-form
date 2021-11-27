import React from 'react';

import { Todo } from '../../types/Todo';

import './TodoItem.scss';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { user } = todo;

  return (
    <li className="TodoItem">
      <div className="TodoItem__user-info">
        <div className="TodoItem_user-info-content">
          <p className="TodoItem__user-name">{user?.name}</p>
          <p className="TodoItem__user-email">{user?.email}</p>
        </div>
      </div>

      <div className="TodoItem__todo-info">
        <p className="TodoItem__todo-title">{todo.title}</p>
        <p className="TodoItem__todo-status">
          {todo.completed ? 'Done' : 'Pending...'}
        </p>
      </div>
    </li>
  );
};
