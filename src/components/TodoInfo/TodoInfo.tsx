import React from 'react';
import { TodoAggregate } from '../../types/TodoAggregate';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: TodoAggregate;
};

export const TodoInfo = ({ todo }: Props) => {
  const { completed, title, user } = todo;

  const todoStatus = completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo';

  return (
    <article data-id={todo.id} className={todoStatus}>
      <h2 className="TodoInfo__title">{title}</h2>

      {user ? <UserInfo user={user} /> : null}
    </article>
  );
};
