import React from 'react';
import { UserInfo } from '../UserInfo';
import { TodoWithUser } from '../../api/types/types';

type Props = {
  todo: TodoWithUser;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { completed, title } = todo;

  return (
    <article
      className={completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo'}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
