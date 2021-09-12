import React from 'react';

import { UserInfo } from '../UserInfo/UserInfo';
import { Todo } from '../Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    title,
    completed,
    user,
  } = todo;

  return (
    <>
      {user && <UserInfo user={user} />}
      <td>{title}</td>
      <td>{completed ? 'Done' : 'No'}</td>
    </>
  );
};
