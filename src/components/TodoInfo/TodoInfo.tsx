import React from 'react';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  todo: Todo;
  user: User;
};

export const TodoInfo: React.FC<Props> = ({ todo, user }) => {
  const {
    title,
    id,
    completed,
  } = todo;

  return (
    <article
      data-id={id}
      className={classNames(
        'TodoInfo', { 'TodoInfo--completed': completed },
      )}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>
      <UserInfo user={user} />
    </article>
  );
};
