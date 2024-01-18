import React from 'react';
import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { TodoWithUser } from '../../types/TodoWithUser';

interface Props {
  todo: TodoWithUser,
}

export const TodoInfo: React.FC<Props> = ({
  todo: {
    id,
    title,
    completed,
    user,
  },
}) => (
  <article
    data-id={id}
    className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
  >
    <h2 className="TodoInfo__title">
      {title}
    </h2>

    <UserInfo user={user} />
  </article>
);
