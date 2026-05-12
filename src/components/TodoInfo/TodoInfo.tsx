import React from 'react';
import { User, UserInfo } from '../UserInfo';

export interface TodoWithUser {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  user: User;
}
interface Props {
  todo: TodoWithUser;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
