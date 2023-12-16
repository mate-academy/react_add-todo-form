import React from 'react';
import classNames from 'classnames';

import { UserInfo } from '../UserInfo';

import { Todo, User } from '../../react-app-env';

import usersFromServer from '../../api/users';

interface Props {
  todo: Todo,
}

export const TodoInfo: React.FC<Props> = ({
  todo,
}) => {
  const user: User | undefined = usersFromServer
    .find(u => u.id === +todo.userId);

  if (!user) {
    return null;
  }

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
