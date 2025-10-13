import React from 'react';
import cn from 'classnames';
import { UserInfo } from '../UserInfo';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User;
};

export const TodoInfo: React.FC<{ todo: Todo }> = ({ todo }) => {
  return (
    <div
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
      data-id={todo.id}
    >
      <p className="TodoInfo__title">{todo.title}</p>
      <UserInfo user={todo.user} />
    </div>
  );
};
