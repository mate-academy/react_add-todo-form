import React from 'react';

import './UserInfo.scss';

import { User } from '../../types/User';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = React.memo(
  ({ user }) => {
    const { email, name } = user;

    return (
      <a
        className="UserInfo"
        href={`mailto:${email}`}
      >
        {name}
      </a>
    );
  },
);
