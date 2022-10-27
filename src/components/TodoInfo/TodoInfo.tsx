import React from 'react';
import classNames from 'classnames';

import { Todo, User } from '../../Types';

import usersFromServer from '../../api/users';

import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user: User | undefined = usersFromServer
    .find((person: User) => person.id === todo.userId);

  return (
    <article
      data-id={todo.id}
      className={classNames(
        'TodoInfo',
        {
          'TodoInfo--completed': todo.completed,
        },
      )}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      <UserInfo user={user} />
    </article>
  );
};
