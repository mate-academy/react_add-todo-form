import React from 'react';
import { UserInfo } from '../UserInfo';
import { ToDo } from '../../props/TODO';
import cn from 'classnames';

type ToDoProps = {
  todo: ToDo;
};

export const TodoInfo: React.FC<ToDoProps> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
