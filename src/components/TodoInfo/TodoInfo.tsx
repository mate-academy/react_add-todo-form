import React from 'react';
import classNames from 'classnames';
import { TodoWithUser } from '../../react-app-env';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: TodoWithUser,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    completed,
    title,
    user,
  } = todo;

  return (
    <article
      data-id={id}
      className={classNames(
        'TodoInfo',
        { 'TodoInfo--completed': completed },
      )}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user
        ? <UserInfo user={user} />
        : 'No user'}
    </article>
  );
};
