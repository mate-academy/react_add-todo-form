import React from 'react';

import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { user, title, completed } = todo;

  return (
    <>
      {user && <UserInfo user={user} />}
      <td>{title}</td>
      <td>{completed ? 'Finished' : 'Unfinished'}</td>
    </>
  );
};
