import React from 'react';
import { TodoUnified } from '../../Types/Unified';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: TodoUnified;
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
