import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { UserInfo } from '../UserInfo';

type Props = {
  user: User,
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ user, todo }) => {
  const { id, title, completed } = todo;

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

      <UserInfo
        user={user}
      />
    </article>
  );
};
