import React from 'react';
import { TodoInterface } from '../../types/Todo';
import cn from 'classnames';
import { UserInfo } from '../UserInfo';

export interface TodoInfoProps {
  todo: TodoInterface;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const { id } = todo;

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
