import React from 'react';
import cn from 'classnames';
import { TodoAgregate } from '../../types/TodoAgregate';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: TodoAgregate;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
