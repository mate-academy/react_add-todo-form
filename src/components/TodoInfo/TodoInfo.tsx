import React from 'react';
import { UserInfo } from '../UserInfo/UserInfo';

type TodoInfoProps = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export const TodoInfo: React.FC<TodoInfoProps> = ({
  id,
  title,
  completed,
  userId,
}) => {
  return (
    <article key={id} data-id={id} className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}>
      <h2 className="TodoInfo__title">
        {title}
      </h2>
      <UserInfo userId={userId} />
    </article>
  );
};
