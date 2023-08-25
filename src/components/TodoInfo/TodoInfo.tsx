import cn from 'classnames';
import React from 'react';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({
  todo: {
    id,
    completed,
    title,
    user,
  },
}) => {
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
