import React from 'react';

type Props = {
  user: {
    name: string;
    email: string;
  };
};

export const UserInfo = ({ user }: Props) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
