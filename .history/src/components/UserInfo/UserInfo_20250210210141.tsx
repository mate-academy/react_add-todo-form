import React from 'react';

type Prop = {
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  } | undefined;
};

export const UserInfo: React.FC<Prop> = ({ user }) => {
  return (
    <a className="UserInfo" href={user.email}>
      {user.name}
    </a>
  );
};
