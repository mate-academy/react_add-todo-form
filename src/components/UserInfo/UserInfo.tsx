import React from 'react';

type UserProps = {
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
};

export const UserInfo: React.FC<UserProps> = ({ user }) => {
  const { name, email } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
