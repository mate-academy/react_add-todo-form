import React from 'react';
import cn from 'classnames';

import { UserInfo } from '../UserInfo';
import { Todo } from '../../types';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    completed,
    title,
    user,
    id,
  } = todo;

  return (
    <article
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
      data-id={id}
      key={id}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>
      {user
        ? <UserInfo user={user} />
        : <p>Invalid user</p>}
    </article>
  );
};
