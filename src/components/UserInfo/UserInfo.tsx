import React from 'react';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

interface Props {
  user: User;
}

export const UserInfo: React.FC<Props> = ({ user: { name, email } }) => (
  <a className="UserInfo" href={`mailto:${email}`}>
    {name}
  </a>
);
