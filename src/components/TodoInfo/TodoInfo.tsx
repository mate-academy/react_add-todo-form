import React from 'react';
import { TodoInterface } from '../../types/Todo';
import cn from 'classnames';
import { UserInfo } from '../UserInfo';

export interface TodoInfoProps {
  todo: TodoInterface;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const { id, completed, user, title } = todo;

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
