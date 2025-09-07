import React from 'react';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

type Props = {
  user: User | undefined;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      <small>{user.name}</small>
    </a>
  );
};
