import React from 'react';
import { TodosWithUsers } from '../../types';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: TodosWithUsers;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={todo.completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo'}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={todo.user} />
    </article>
  );
};
