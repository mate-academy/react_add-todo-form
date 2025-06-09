import React from 'react';
import cn from 'classnames';

import { UserInfo } from '../UserInfo';
import { TodoWithUser } from '../../entities/TodoWithUser';

interface TodoInfoProps {
  todo: TodoWithUser;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  return (
    <article
      key={todo.id}
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user ? <UserInfo user={todo.user} /> : false}
    </article>
  );
};
