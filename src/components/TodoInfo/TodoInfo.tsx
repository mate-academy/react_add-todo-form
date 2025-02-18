import React from 'react';
import cn from 'classnames';
import usersFromServer from '../../api/users';
import { UserTodo } from '../../Types/UserTodo';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: UserTodo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed, userId } = todo;

  const todoUser = usersFromServer.find(user => user.id === userId) || null;

  return (
    <article
      data-id={id}
      key={id}
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {todoUser && <UserInfo user={todoUser} />}
    </article>
  );
};
