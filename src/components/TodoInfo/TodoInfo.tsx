import React from 'react';
import UserInfo, { User } from '../UserInfo/UserInfo';

export interface TodoGeneral {
  id: number;
  title: string;
  completed: boolean;
  user?: User;
}

export const TodoInfo: React.FC<{ todo: TodoGeneral }> = ({ todo }) => {
  const { id, title, completed, user } = todo;

  return (
    <article
      data-id={id}
      className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};

export default TodoInfo;
