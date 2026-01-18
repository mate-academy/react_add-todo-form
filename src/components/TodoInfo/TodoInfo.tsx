import React from 'react';
import { Todo, User } from '../../types/types';
import { UserInfo } from '../UserInfo';
import cn from 'classnames';

interface TodoInfoProps {
  todo: Todo;
  user?: User;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo, user }) => {
  const todoUser = user || todo.user;

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todoUser && <UserInfo user={todoUser} />}
    </article>
  );
};
