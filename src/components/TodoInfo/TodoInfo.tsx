import React from 'react';
import { TodoItem } from '../../types/todoItem';
import cn from 'classnames';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: TodoItem;
};

export const TodoInfo: React.FC<Props> = ({ todo: todo }) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
