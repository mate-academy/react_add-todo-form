import classNames from 'classnames';
import React from 'react';

import { Todo } from '../../types/todo';
import { User } from '../../types/user';
import { UserInfo } from '../UserInfo';

import usersFromServer from '../../api/users';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const users: User[] = usersFromServer;
  const user: User = users.find(
    currentUser => currentUser.id === todo.userId,
  ) ?? {
    id: 0,
    name: '',
    username: '',
    email: '',
  };

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
