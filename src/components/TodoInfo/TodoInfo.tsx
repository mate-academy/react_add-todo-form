import React from 'react';
import { Todo } from '../../types';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed, user } = todo;

  if (!user) {
    return null;
  }

  return (
    <article
      data-id={id}
      className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      <a
        className="UserInfo"
        href={`mailto:${user.email}`}
        data-cy="userEmailLink"
      >
        {user.name}
      </a>
    </article>
  );
};
