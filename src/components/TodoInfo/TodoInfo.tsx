import React from 'react';
import { Todo, User } from '../../types';
import { UserInfo } from '../UserInfo';

import classNames from 'classnames';

interface TodoInfoProps {
  todo: Todo;
  user: User | undefined;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo, user }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
