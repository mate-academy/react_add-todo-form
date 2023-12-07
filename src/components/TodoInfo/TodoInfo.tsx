import React from 'react';
import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { TodoWithUser } from '../types';

interface Props {
  todo: TodoWithUser
}
export const TodoInfo:React.FC<Props> = ({ todo }) => {
  const { user, title, completed } = todo;

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>
      <UserInfo user={user} key={user?.id} />
    </article>
  );
};
