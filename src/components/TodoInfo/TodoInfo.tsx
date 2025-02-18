/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { UserInfo } from '../UserInfo/UserInfo';
import { clsx } from 'clsx';
import { Todo } from '../../Interfaces/intTodo';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={clsx('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user ? (
        <UserInfo user={todo.user} />
      ) : (
        <p className="TodoInfo__no-user">No user assigned</p>
      )}
    </article>
  );
};
