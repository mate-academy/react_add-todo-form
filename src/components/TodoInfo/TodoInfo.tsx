import React from 'react';
import cn from 'classnames';
import { UserInfo } from '../UserInfo';

type TodoInfoProps = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export const TodoInfo: React.FC<TodoInfoProps> = todo => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo userId={todo.userId} />
    </article>
  );
};
