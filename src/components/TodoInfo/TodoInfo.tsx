import React from 'react';
import { Todo } from '../../types';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed, user } = todo;
  const { email, name } = user || {};

  return (
    <article
      data-id={id}
      className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {email ? (
        <a className="UserInfo" href={`mailto:${email}`}>
          {name}
        </a>
      ) : (
        <span className="UserInfo">{name ?? 'Unknown user'}</span>
      )}
    </article>
  );
};
