import React from 'react';

interface Props {
  name: string
  email: string
}

export const UserInfo: React.FC<Props> = ({ email, name }) => (
  <a className="UserInfo" href={email}>
    {name}
  </a>
);
