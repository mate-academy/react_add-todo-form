import React from 'react';
import { User } from '../../types/User';

type Props = {
  user: User | undefined,
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (user
    ? (
      <a className="UserInfo" href={`mailto:${user.email}`}>
        {user.name}
      </a>
    ) : (
      <span className="UserInfo">
        Unknown user
      </span>
    ));
};
