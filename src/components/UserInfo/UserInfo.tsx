import React from 'react';

import { User } from '../../Types';

type Props = {
  user: User,
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  const { name, email } = user;

  return (user
    ? (
      <a className="UserInfo" href={`mailto:${email}`}>
        {name}
      </a>
    )
    : (
      <p className="UserInfo">
        Unknown user
      </p>
    )
  );
};
