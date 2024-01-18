import React from 'react';
import cn from 'classnames';

import { TodoWUser } from '../../types/TodoWUser';
import { UserInfo } from '../UserInfo';

export type Props = {
  todo: TodoWUser;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && (
        <UserInfo user={todo.user} />
      )}
    </article>
  );
};
