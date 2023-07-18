import React from 'react';
import cn from 'classnames';

import { UserInfo } from '../UserInfo/UserInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    user,
  } = todo;

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >

      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
