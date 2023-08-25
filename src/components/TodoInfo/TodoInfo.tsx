import cn from 'classnames';
import React from 'react';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  todo: Todo,
  users: User[]
};

export const TodoInfo: React.FC<Props> = ({ todo, users }) => {
  if (!users) {
    return null;
  }

  const getUserById = (id: number) => (users
    ? users.find(user => user.id === id)
    : null
  );

  const user = getUserById(todo.userId);

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
