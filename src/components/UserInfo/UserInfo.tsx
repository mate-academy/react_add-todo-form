import React from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Props {
  user: User | undefined;
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
