import React from 'react';

type Props = {
  user?: {
    email?: string;
    id?: number;
    name?: string;
    username?: string;
  };
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user?.email}`}>
      {user?.name}
    </a>
  );
};
