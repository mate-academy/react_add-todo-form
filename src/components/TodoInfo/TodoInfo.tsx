import React from 'react';
import cn from 'classnames';

import usersFromServer from '../../api/users';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: {
    id: number;
    title: string;
    completed: boolean;
    userId: number;
  };
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed, userId } = todo;

  const currentUser = usersFromServer.find(user => user.id === userId);

  if (currentUser === undefined) {
    return;
  }

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo user={currentUser} />
    </article>
  );
};
