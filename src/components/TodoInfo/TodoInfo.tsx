import { TodoItem } from '../../types/TodoItems';
import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import React from 'react';

type Props = {
  todo: TodoItem;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    data-id={todo.id}
    key={todo.id}
    className={cn('TodoInfo', {
      'TodoInfo--completed': todo.completed,
    })}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    <UserInfo user={todo.user} />
  </article>
);
