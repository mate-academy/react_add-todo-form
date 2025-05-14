import React from 'react';
import { UserInfo } from '../UserInfo';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User;
}

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const todoClassName = `TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`;

  return (
    <div className={todoClassName} data-id={todo.id}>
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={todo.user} />
    </div>
  );
};
