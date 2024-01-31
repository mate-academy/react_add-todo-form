import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/TODO';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';
import { User } from '../../types/User';

type Props = {
  todo: Todo;
};

export function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId);
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user = getUserById(todo.userId);

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo',
        { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>
      {usersFromServer.includes(user as User)
        && <UserInfo user={user as User} />}
    </article>
  );
};
