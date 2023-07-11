import React from 'react';

interface Prps {
  user: {
    email: string;
    name: string;
  }
}

export const UserInfo: React.FC<Prps> = ({ user: { email, name } }) => (
  <a className="UserInfo" href={`mailto:${email}`}>
    {name}
  </a>
);
