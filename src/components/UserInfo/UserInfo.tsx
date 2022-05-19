import React from 'react';

import { User } from '../../interfaces/User';

type Props = {
  user: User | null;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    user ? (
      <div className="userInfo">
        <h2 className="title">
          User Info
        </h2>
        <p className="userInfo__name">
          {user.name}
        </p>
        <p className="userInfo__phone">
          {user.phone}
        </p>
        <p className="userInfo__email">
          {user.email}
        </p>
      </div>
    )
      : (
        <h2>
          User is absent
        </h2>
      )
  );
};
