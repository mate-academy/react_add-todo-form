import React from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
import { User } from '../../types/User';
import users from '../../api/users';

type Props = {
  todo: Todo;
};

function getUserById(id: number) {
  return users.find(user => user.id === id) as User;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    data-id={todo.id}
    className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    key={todo.id}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    <UserInfo user={getUserById(todo.userId)} />
  </article>
);
