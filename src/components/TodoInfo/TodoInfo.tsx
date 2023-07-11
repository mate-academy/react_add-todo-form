import React from 'react';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { User } from '../../services/interfaces';

interface Props {
  todo: {
    title: string;
    id: number,
    completed: boolean;
    user: User | null;
  }
}

export const TodoInfo: React.FC<Props> = (
  {
    todo: {
      title, id, completed, user,
    },
  },
) => (
  <article
    data-id={id}
    className={classNames('TodoInfo', {
      'TodoInfo--completed': completed,
    })}
  >
    <h2 className="TodoInfo__title">{title}</h2>

    {user && (
      <UserInfo user={user} />
    )}
  </article>
);
