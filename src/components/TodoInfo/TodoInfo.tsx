import React from 'react';
import { UserInfo } from '../UserInfo/UserInfo';
import type { Todo } from '../../api/types';

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  return (
    <div
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
      data-cy="todoInfo"
      data-id={todo.id}
    >
      <p className="TodoInfo__title" data-cy="todoTitle">
        {todo.title}
      </p>
      {todo.user && <UserInfo user={todo.user} />}
    </div>
  );
};
