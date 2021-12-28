import React from 'react';
import { User } from '../../type/user';

type Props = {
  user: User | undefined;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <>
      {user && (
        <span>
          {`${user.name} - ${user.email}`}
        </span>
      )}
    </>
  );
};
