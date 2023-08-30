import cn from 'classnames';
import React from 'react';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../interfaces/todo';
import users from '../../api/users';
import { User } from '../../interfaces/user';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const currentUser = users.find(user => user.id === todo.userId) as User;

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

      {currentUser && <UserInfo user={currentUser} />}
    </article>
  );
};
