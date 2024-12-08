import React from 'react';
import { Todo } from '../../types/';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      key={todo.id}
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user ? (
        <UserInfo user={todo.user} />
      ) : (
        <p className="TodoInfo__user-missing">User information not available</p>
      )}
    </article>
  );
};
