import React from 'react';
import { UserInfo } from '../UserInfo';

type TodoInfoProps = {
  id: number;
  title: string;
  completed: boolean;
  user?: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
};

export const TodoInfo: React.FC<TodoInfoProps> = ({
  id,
  title,
  completed,
  user,
}) => {
  return (
    <article
      data-id={id}
      className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}
      key={id}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      <UserInfo name={user?.name} email={user?.email} />
    </article>
  );
};
