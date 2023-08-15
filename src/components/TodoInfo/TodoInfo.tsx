import React from 'react';
import cn from 'classnames';
import { TodoWithUser } from '../../types/TodoWithUser';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: TodoWithUser,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    data-id={todo.id}
    className={
      cn('TodoInfo', 'box', { 'TodoInfo--completed': todo.completed })
    }
  >
    <h2 className="TodoInfo__title">
      {todo.title}
    </h2>

    {todo.user && (
      <UserInfo user={todo.user} />
    )}
  </article>
);
