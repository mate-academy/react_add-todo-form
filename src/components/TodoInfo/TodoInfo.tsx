import React from 'react';
import cn from 'classnames';
import users from '../../api/users';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface Props {
  todo: Todo;
}

function getUserById(userId: number): User | undefined {
  return users.find(user => userId === user.id);
}

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    data-id={todo.id}
    key={todo.id}
    className={cn('TodoInfo', {
      'TodoInfo--completed': todo.completed,
    })}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    <UserInfo user={getUserById(todo.userId)} />
  </article>
);
