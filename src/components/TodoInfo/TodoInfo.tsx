import React from 'react';
import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { TodoWithUser } from '../../react-app-env';

type Props = {
  todo: TodoWithUser
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id, title, user, completed,
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

      { user && <UserInfo user={user} /> }
    </article>
  );
};
