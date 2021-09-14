import React from 'react';
import { UserInfo } from '../UserInfo/UserInfo';

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
