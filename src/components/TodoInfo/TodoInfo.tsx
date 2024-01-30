import React from 'react';
import classNames from 'classnames';
import { TODO } from '../../types/TODO';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';
import { User } from '../../types/User';

type Props = {
  todo: TODO;

};

export function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId);
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo',
        { 'TodoInfo--completed': todo.completed === true })}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      <UserInfo user={getUserById(todo.userId) as User} />
    </article>
  );
};
