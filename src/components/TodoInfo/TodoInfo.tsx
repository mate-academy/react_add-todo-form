import classNames from 'classnames';
import React from 'react';
import { Todo, User } from '../../types';

import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
  users: User[];
};

export const TodoInfo: React.FC<Props> = ({ todo, users }) => {
  const getUserById = (userId: number) => {
    return users.find(user => user.id === userId) || undefined;
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
