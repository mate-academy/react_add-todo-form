import React from 'react';
import { TodoInfoProps } from '../../Types';
import { UserInfo } from '../UserInfo';

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const { id, completed, title, user } = todo;

  return (
    <article
      data-id={id}
      className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {user ? <UserInfo user={user} /> : <p>No user found</p>}
    </article>
  );
};
