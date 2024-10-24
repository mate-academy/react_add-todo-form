import React from 'react';
import { TODO } from '../../types/todo';
import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';

type Props = {
  todo: TODO;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={usersFromServer.find(u => todo.userId === u.id)} />
    </article>
  );
};
