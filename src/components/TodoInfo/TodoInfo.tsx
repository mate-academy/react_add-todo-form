import React from 'react';
import cn from 'classnames';
import { User } from '../../interfaces/user';
import { Todo } from '../../interfaces/todo';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo & { todoUser?: User | undefined; }
}

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    data-id={todo.id}
    className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
  >
    <h2 className="TodoInfo__title">
      {todo.title}
    </h2>

    {todo.todoUser && <UserInfo user={todo.todoUser} />}
  </article>
);
