// TodoInfo.tsx
import React from 'react';
import { UserInfo } from '../UserInfo/UserInfo';
import { Todo, User } from '../../api/types';
import usersFromServer from '../../api/users';

interface TodoInfoProps {
  todo: Todo;
  user?: User;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo, user }) => {
  const safeUser = user || usersFromServer.find(u => u.id === todo.userId);

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={safeUser} />
    </article>
  );
};
