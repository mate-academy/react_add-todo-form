import classNames from 'classnames';
import React from 'react';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  todo: Todo,
  users: User[],
};

export const TodoInfo: React.FC<Props> = ({ todo, users }) => {
  const {
    id,
    title,
    completed,
    userId,
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

      {userId && (
        <UserInfo userId={userId} users={users} />
      )}
    </article>
  );
};
