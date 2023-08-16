import React from 'react';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/interface';

type TodoInfoProps = {
  todo: Todo;
};

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const { completed, title, user } = todo;

  return (
    <article
      className={`TodoInfo ${completed && 'TodoInfo--completed'}`}
      data-id={todo.id}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
