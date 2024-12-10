import React from 'react';
import cn from 'classnames';
import { UserInfo } from '../UserInfo/UserInfo';
import { TodoWithUser } from '../../types/todo';

type Props = {
  todo: TodoWithUser;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed, user } = todo;

  return (
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
};
