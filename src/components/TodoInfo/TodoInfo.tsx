import React from 'react';
import cn from 'classnames';
import { Todo } from '../../services/todo';
import { User } from '../../services/user';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo,
  user: User | undefined,
};

export const TodoInfo: React.FC<Props> = ({ todo, user }) => {
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
