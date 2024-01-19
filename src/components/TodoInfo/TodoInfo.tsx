import React from 'react';
import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { UserTodo } from '../types';

interface Prop {
  todo: UserTodo;
}

export const TodoInfo: React.FC<Prop> = ({ todo }) => (
  <article
    data-id={todo.id}
    className={cn('TodoInfo', {
      'TodoInfo--completed': todo.completed === true,
    })}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    <UserInfo
      user={todo.user}
    />
  </article>
);
