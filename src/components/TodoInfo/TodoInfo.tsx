import cn from 'classnames';
import { UserInfo } from '../UserInfo/UserInfo';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    data-id={todo.id}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    {todo.user !== null && <UserInfo user={todo.user} />}
  </article>
);
