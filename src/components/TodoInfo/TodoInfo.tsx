/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Todo } from '../../Types/InterfaceTodo';
import { clsx } from 'clsx';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={clsx('TodoInfo', todo.completed && 'TodoInfo--completed')}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
