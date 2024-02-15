import React from 'react';
import cn from 'classnames';
import users from '../../api/users';
import { UserInfo } from '../UserInfo';

type Props = {
  id: number,
  title: string,
  userId: number,
  completed: boolean,
};

export const TodoInfo: React.FC<Props> = ({
  id,
  title,
  userId,
  completed,
}) => {
  const currentUser = users.find(user => user.id === userId) || users[0];

  return (
    <article
      data-id={id}
      key={id}
      className={cn(
        'TodoInfo',
        {
          'TodoInfo--completed': completed,
        },
      )}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      <UserInfo user={currentUser} />
    </article>
  );
};
