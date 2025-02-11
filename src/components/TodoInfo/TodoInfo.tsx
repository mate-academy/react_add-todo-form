import React from 'react';
import { UserInfo } from '../UserInfo';
import { Todos } from '../../api/interfaces';

interface Props {
  todo: Todos;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
      data-id={todo.id}
      id={String(todo.id)}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={todo.user} />
    </article>
  );
};
