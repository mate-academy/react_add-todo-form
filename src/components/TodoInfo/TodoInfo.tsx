import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      className={cn(
        'TodoInfo',
        {
          'TodoInfo--completed': todo.completed,
        },
      )}
      key={todo.id}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
