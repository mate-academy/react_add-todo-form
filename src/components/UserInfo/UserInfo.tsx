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
    <a key={user.id} className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
