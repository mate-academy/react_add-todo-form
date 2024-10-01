import React from 'react';
import { userInfo } from '../UserInfo';

type TodoInfoProps = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  userEmail: string;
  userName: string;
};

export const TodoInfo: React.FC<TodoInfoProps> = ({
  id,
  title,
  completed,
  userEmail,
  userName,
}) => {
  return (
    <article
      data-id={id}
      className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      <userInfo email={userEmail}
        name={userName} />
    </article>
  );
};
