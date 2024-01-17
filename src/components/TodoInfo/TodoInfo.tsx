import React from 'react';
import cn from 'classnames';
import { TodoAndUser } from '../../types/TodoAndUsers';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: TodoAndUser;
}

export const TodoInfo: React.FC<Props> = ({
  todo: {
    id, completed, title, user,
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
      <UserInfo user={user} />
    </article>
  );
};
