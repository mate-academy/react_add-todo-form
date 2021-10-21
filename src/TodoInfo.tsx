import React from 'react';
import { Todo } from './types';
import { UserInfo } from './UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { user, title } = todo;

  return (
    <>
      {user && <UserInfo user={user} />}
      {title}
    </>
  );
};
