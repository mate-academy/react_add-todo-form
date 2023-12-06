import React from 'react';
import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { TodoWithUser } from '../types';

interface Props {
  todo: TodoWithUser
}
export const TodoInfo:React.FC<Props> = ({ todo }) => {
  const { user } = todo;

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>
      <UserInfo user={user} key={todo.user?.id} />
    </article>
  );
};
