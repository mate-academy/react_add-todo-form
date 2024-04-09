import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import React from 'react';
import { Task } from '../../types/Task';

type Props = {
  todo: Task;
};

export const TodoInfo: React.FC<Props> = ({
  todo: { id, completed, title, user },
}) => (
  <article
    data-id={id}
    className={cn('TodoInfo', {
      'TodoInfo--completed': completed,
    })}
  >
    <h2 className="TodoInfo__title">{title}</h2>
    <UserInfo user={user} />
  </article>
);
