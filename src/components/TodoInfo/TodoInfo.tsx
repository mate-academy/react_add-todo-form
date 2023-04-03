import React from 'react';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { Props } from './TodoIndo.types';

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
        'message',
        'TodoInfo',
        {
          'TodoInfo--completed is-success': completed,
          'is-danger': !completed,
        },
      )}
    >
      <h2 className="TodoInfo__title message-header">
        {title}
      </h2>

      {user && (
        <UserInfo user={user} />
      )}
    </article>
  );
};
