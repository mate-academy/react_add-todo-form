import React from 'react';

type Props = {
  user: User;
};

export interface User {
  id: number,
  name: string,
  email: string,
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  const { email, name } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
