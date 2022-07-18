import React from 'react';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title, completed, user } = todo;

  return (
    <>
      {user && <UserInfo users={user} />}
      <h2 data-cy="title">{title}</h2>
      <p data-cy="status">
        {completed ? ('Done') : ('In process')}
      </p>
    </>
  );
};
