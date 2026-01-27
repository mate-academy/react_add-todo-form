import React from 'react';

export type User = {
  id: number;
  name: string;
  email: string;
  username: string;
};

type UserProps = { user?: User | null };

export const UserInfo: React.FC<UserProps> = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
