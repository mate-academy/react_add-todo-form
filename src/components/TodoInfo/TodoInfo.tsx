import React from 'react';
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

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <div
      className={`TodoInfo${todo.completed ? ' TodoInfo--completed' : ''}`}
      data-id={todo.id}
    >
      <div className="TodoInfo__title">{todo.title}</div>
      <UserInfo user={todo.user} />
    </div>
  );
};
