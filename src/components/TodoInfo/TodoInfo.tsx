import React from 'react';
import { Todo } from '../../types/types';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';
import cn from 'classnames';

export const TodoInfo: React.FC<{ todo: Todo }> = ({ todo }) => {
  const filteredUsers = usersFromServer.filter(user => todo.userId === user.id);

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {filteredUsers.map(user => (
        <UserInfo key={user.id} user={user} />
      ))}
    </article>
  );
};
