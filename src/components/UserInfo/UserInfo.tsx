import React from 'react';
import { UsersType } from '../../types/UsersType';

type Props = {
  user: UsersType | undefined;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    user && (
      <a className="UserInfo" href={`mailto:${user.email}`}>
        {user.name}
      </a>
    )
  );
};
