import React from 'react';
import { User } from '../../type/user';

type Props = {
  user: User
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <>
        <span>
          {`${user?.name} - ${user?.email}`}
        </span>
    </>
  );
};
