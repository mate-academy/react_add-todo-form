import React from 'react';
import cn from 'classnames';
import { Todo } from '../types/types';
import { UserInfo } from '../UserInfo';

interface TDInfo {
  todo: Todo;
}

export const TodoInfo: React.FC<TDInfo> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', todo.completed ? 'TodoInfo--completed' : '')}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
