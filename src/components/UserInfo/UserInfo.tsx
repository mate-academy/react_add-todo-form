import React from 'react';

interface Props {
  user: {
    name: string;
    email: string;
  };
}

export const UserInfo: React.FC<Props> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user.name}
  </a>
);
