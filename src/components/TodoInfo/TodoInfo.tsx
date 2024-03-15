import React from 'react';
import cn from 'classnames';
import { TodoWithUser } from '../../types';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: TodoWithUser;
};

export const TodoInfo: React.FC<Props> = ({
  todo: { completed, id, title, user },
}) => {
  return (
    <article
      data-id={id}
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
