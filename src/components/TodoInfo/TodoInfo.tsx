import React from 'react';
import cn from 'classnames';

import { TodoProps } from '../../utilities/types/TodoProps';
import { UserInfo } from '../UserInfo';

export const TodoInfo: React.FC<TodoProps> = ({ todo }) => {
  return (
    <article
      key={todo.id}
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo?.user} />
    </article>
  );
};
