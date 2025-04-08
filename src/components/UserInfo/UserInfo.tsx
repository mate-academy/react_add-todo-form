import React from 'react';

type TODO = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Props = {
  todo: TODO;
  findUserById: (n: number) => User;
};

export const UserInfo: React.FC<Props> = ({ todo, findUserById }) => {
  return todo.user ? (
    <a className="UserInfo" href={`mailto:${todo.user.email}`}>
      {todo.user.name}
    </a>
  ) : (
    <a className="UserInfo" href={`mailto:${findUserById(todo.userId)?.email}`}>
      {findUserById(todo.userId)?.name}
    </a>
  );
};
