import React from 'react';

type User = {
  user?: {
    email: string;
    name: string;
  };
};

export const UserInfo = ({ user }: User) => (
  <a className="UserInfo" href={`mailto:${user?.email}`}>
    {user?.name}
  </a>
);
