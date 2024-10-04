import React from 'react';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/types';

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const { id, title, userId, completed } = todo;
  const user = usersFromServer.find(u => u.id === userId);

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
