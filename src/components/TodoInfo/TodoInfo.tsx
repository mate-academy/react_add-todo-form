import React from 'react';
import cn from 'classnames';

import { UserInfo } from '../UserInfo';
import { TodoWithUser } from '../../types';

type Props = {
  todo: TodoWithUser,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={cn(
        'TodoInfo', { 'TodoInfo--completed': todo.completed },
      )}
    >

      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {todo.user
        && <UserInfo key={todo.userId} user={todo.user} />}
    </article>
  );
};
