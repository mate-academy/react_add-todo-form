import { CompletedTodo } from '../../types/Todo';
import React from 'react';
import cn from 'classnames';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: CompletedTodo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed } = todo;

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
