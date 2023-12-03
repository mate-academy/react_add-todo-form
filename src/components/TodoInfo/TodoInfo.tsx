import React from 'react';
import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={cn(
        'TodoInfo',
        { 'TodoInfo--completed': todo.completed },
      )}
      key={todo.id}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {todo.user && (<UserInfo user={todo.user} />)}
    </article>
  );
};
