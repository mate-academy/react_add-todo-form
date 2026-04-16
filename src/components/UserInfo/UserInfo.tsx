import React from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

type Props = {
  user: User | null;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  if (!user) {
    return <div className="UserInfo" />;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
