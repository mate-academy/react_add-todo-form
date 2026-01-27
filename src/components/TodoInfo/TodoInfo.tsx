import React from 'react';
import { UserInfo } from '../UserInfo/UserInfo';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
}

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  return (
    <article data-id={todo.id} className="TodoInfo">
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo name={todo.user.name} email={todo.user.email} />
    </article>
  );
};
