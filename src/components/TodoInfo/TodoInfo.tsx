import React from 'react';
import cn from 'classnames';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';

function findUser(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user = findUser(todo.userId);

  return (
    <article
      data-id={todo.id}
      className={cn(
        'TodoInfo',
        { 'TodoInfo--completed': todo.completed === true })
      }
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
