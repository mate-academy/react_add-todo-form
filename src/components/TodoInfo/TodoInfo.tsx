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
  completed: boolean
  userId: number;
};

type TodoInfoProps = {
  todo: Todo;
  users: Users[];
};

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo, users }) => {
  const {
    id,
    title,
    completed,
    userId,
  } = todo;
  const foundUser = users.find((user) => user.id === userId);

  return (
    <article data-id={id} className={`TodoInfo ${completed && 'TodoInfo--completed'}`}>
      <h2 className="TodoInfo__title">
        {title}
      </h2>
      {foundUser && <UserInfo key={foundUser.id} user={foundUser} />}
    </article>
  );
};
