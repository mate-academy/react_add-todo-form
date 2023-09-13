import React from 'react';
import { UserInfo, User } from '../UserInfo';

type Props = {
  todo: Todo;
};

export interface Todo {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
  user: User | null,
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    user,
    id,
    title,
    completed,
  } = todo;

  return (
    <article data-id={id} className={`TodoInfo  ${completed && 'TodoInfo--completed'}`}>
      <h2 className="TodoInfo__title">{title}</h2>

      { user && <UserInfo user={user} /> }
    </article>
  );
};
