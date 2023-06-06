import React from 'react';
import { UserInfo, User } from '../UserInfo';

export type Todo = {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
  user: User | null,
};

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    completed,
    title,
    user,
  } = todo;

  return (
    <article data-id={id} className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}>
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && (
        <UserInfo user={user} />
      )}
    </article>
  );
};
