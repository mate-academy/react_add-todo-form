import React from 'react';
import classNames from 'classnames';
import { Todo, User } from '../../types';
import { UserInfo } from '../UserInfo';

interface TodoWithUser extends Todo {
  user?: User;
}

interface TodoInfoProps {
  todo: Todo;
  user?: User;
}

export const TodoInfo = ({ todo, user }: TodoInfoProps) => {
  const todoWithUser = todo as TodoWithUser;
  const currentUser = user || todoWithUser.user;

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={currentUser} />
    </article>
  );
};
