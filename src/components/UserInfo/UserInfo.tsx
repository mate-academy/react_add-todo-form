import React from 'react';

type UserInfoProps = {
  user: {
    name: string;
    email: string;
  };
};

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user.name}
  </a>
);
