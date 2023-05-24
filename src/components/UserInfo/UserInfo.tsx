import React from 'react';

export type User = {
  id: number,
  name: string,
  username: string,
  email: string,
};

type Props = {
  user: User,
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  const { email, name } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
