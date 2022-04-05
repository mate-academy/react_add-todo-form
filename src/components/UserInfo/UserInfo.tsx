import React from 'react';

import { User } from '../../types/types';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <>
      <p>{user.name}</p>
      <p>{user.email}</p>
    </>
  );
};
