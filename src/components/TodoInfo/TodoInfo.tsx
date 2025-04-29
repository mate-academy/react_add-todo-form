import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { getUserById } from '../../services/user';
import { UserInfo } from '../UserInfo';
import { User } from '../../types/User';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed, userId } = todo;

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo user={getUserById(userId) as User} />
    </article>
  );
};
