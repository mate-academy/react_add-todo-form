import React from 'react';
import { Todo } from '../../interfaces/Todos';
import { UserInfo } from '../UserInfo';
import cn from 'classnames';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    data-id={todo.id}
    className={cn({ 'TodoInfo--completed': todo.completed }, 'TodoInfo')}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>
    {todo.user && <UserInfo user={todo.user} />}
  </article>
);
