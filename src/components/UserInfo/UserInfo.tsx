import React from 'react';

type Props = {
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
