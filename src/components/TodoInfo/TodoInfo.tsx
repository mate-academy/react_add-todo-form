import React from 'react';
import classNames from 'classnames';

import { Todo, User } from '../../Types';

import usersFromServer from '../../api/users';

import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    userId,
  } = todo;

  const user: User | undefined = usersFromServer
    .find((person: User) => person.id === userId);

  return (user
    ? (
      <article
        data-id={id}
        className={classNames(
          'TodoInfo',
          {
            'TodoInfo--completed': completed,
          },
        )}
      >
        <h2 className="TodoInfo__title">
          {title}
        </h2>

        <UserInfo user={user} />
      </article>
    )
    : <></>);
};
