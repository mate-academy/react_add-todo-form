import React from 'react';
import { UserInfo } from '../UserInfo';

type Users = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Todo = {
  id: number;
  title: string;
  userId: number;
};

type TodoInfoProps = {
  todo: Todo;
  users: Users[];
};

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo, users }) => {
  return (
    <article data-id={todo.id} className="TodoInfo TodoInfo--completed">
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>
      {users.filter((user) => todo.userId === user.id).map((user) => (
        <UserInfo key={user.id} user={user} />
      ))}
    </article>
  );
};
