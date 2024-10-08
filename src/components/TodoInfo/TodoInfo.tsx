import React, { FC } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todo: Todo;
};

export const TodoInfo: FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <a className="UserInfo" href={`mailto:${todo.user.email}`}>
        {todo.user.name}
      </a>
    </article>
  );
};
