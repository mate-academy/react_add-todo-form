import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { UserInfo } from '../UserInfo';
import classNames from 'classnames';
import usersFromServer from '../../api/users';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const todoOwner: User = usersFromServer.find(
    (user: User) => user.id === todo.userId,
  ) as User;

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todoOwner} />
    </article>
  );
};
