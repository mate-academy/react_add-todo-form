import cn from 'classnames';
import React from 'react';
import { UserInfo } from '../UserInfo';
import { TodoUser } from '../../types/ToDoInfo';

type Props = {
  todo: TodoUser
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id.toString()}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
