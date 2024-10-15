import React from 'react';
import { Todo } from '../../types';
import { UserInfo } from '../UserInfo/UserInfo';

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  return (
    <div
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
      data-id={todo.id}
    >
      <h3 className="TodoInfo__title">{todo.title}</h3>
      <UserInfo user={todo.user} />
    </div>
  );
};
