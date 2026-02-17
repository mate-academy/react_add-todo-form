import React from 'react';
import { UserInfo } from '../UserInfo';
import { TodoInfoProps } from '../../interfaces';

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  if (!todo) {
    return null;
  }

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
