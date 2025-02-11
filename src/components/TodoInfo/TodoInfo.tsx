import React from 'react';
import { UserInfo } from '../UserInfo';

interface Todos {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface Users {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Props {
  todo: Todos;
  users: Users[];
}

export const TodoInfo: React.FC<Props> = ({ todo, users }) => {
  return (
    <article className={`TodoInfo ${todo.completed && 'TodoInfo--completed'}`}>
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo users={users} userId={todo.userId} />
    </article>
  );
};
