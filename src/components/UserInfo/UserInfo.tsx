import React from 'react';

type Props = {
  user: {
    email: string;
    name: string;
  };
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
