import React from 'react';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';

export const TodoInfo: React.FC<{ todo: Todo }> = ({ todo }) => {
  return (
    <div
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
      data-id={todo.id}
    >
      <div className="TodoInfo__title">{todo.title}</div>
      <UserInfo user={todo.user} />
    </div>
  );
};
