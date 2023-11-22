import React from 'react';
import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { ToDo } from '../../types';

type Props = {
  todo: ToDo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>
      {todo.user && (
        <UserInfo
          user={todo.user}
        />
      )}
    </article>
  );
};
