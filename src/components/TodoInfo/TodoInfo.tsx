import React from 'react';
import { Todos } from '../../types/Todos';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todos;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user ? (
        <UserInfo user={todo.user} />
      ) : (
        <span className="UserInfo__empty">No user info available</span>
      )}
    </article>
  );
};
