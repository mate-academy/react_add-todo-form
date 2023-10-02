import React from 'react';
// import { Todo } from '../types/todo';
import { UserInfo } from '../UserInfo';
import { User } from '../types/user';

type Props = {
  title: string;
  completed: boolean;
  user: User | null;
};

export const TodoInfo: React.FC<Props> = ({
  title,
  completed = false,
  user,
}) => {
  return (
    <article data-id="1" className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}>
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
