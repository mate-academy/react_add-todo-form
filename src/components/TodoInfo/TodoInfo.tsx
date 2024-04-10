import React from 'react';
import { Todos } from '../../types';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todos;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed, user } = todo;

  return (
    <>
      {completed ? (
        <article data-id={id} className="TodoInfo TodoInfo--completed">
          <h2 className="TodoInfo__title">{title}</h2>
          {user && <UserInfo user={user} />}
        </article>
      ) : (
        <article data-id={id} className="TodoInfo">
          <h2 className="TodoInfo__title">{title}</h2>

          {user && <UserInfo user={user} />}
        </article>
      )}
    </>
  );
};
