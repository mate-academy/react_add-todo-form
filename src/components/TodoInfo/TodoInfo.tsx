import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types';

import usersFromServer from '../../api/users';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const getUserById = (userId: number) => {
    return usersFromServer.find(user => user.id === userId) || undefined;
  };

  return (
    <article
      data-id={todo.id}
      className={classNames(
        'TodoInfo',
        todo.completed && 'TodoInfo--completed',
      )}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={getUserById(todo.userId)} />
    </article>
  );
};
