import React from 'react';
import { Todo } from '../Types/types';
import { UserInfo } from '../UserInfo';

interface Props {
  userId: number;
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title, completed, user } = todo;

  const todoClass = `TodoInfo ${completed ? 'TodoInfo--completed' : ''}`;

  return (
    <article data-id={todo.id} className={todoClass}>
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo user={user} userId={0} />
    </article>
  );
};
