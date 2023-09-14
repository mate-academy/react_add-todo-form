import React from 'react';
import cn from 'classnames';

import { UserInfo } from '../UserInfo';
import { TodoWithUser } from '../../types';

type Props = {
  todo: TodoWithUser,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    completed,
    title,
    user,
    userId,
  } = todo;

  return (
    <article
      data-id={id}
      className={cn(
        'TodoInfo', { 'TodoInfo--completed': completed },
      )}
    >

      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user
        && <UserInfo key={userId} user={user} />}
    </article>
  );
};
