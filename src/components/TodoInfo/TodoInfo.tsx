import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface Props {
  user: User;
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ user, todo }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? ' TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <a className="UserInfo" href={`mailto:${user?.email}`}>
        {user?.name}
      </a>
    </article>
  );
};
