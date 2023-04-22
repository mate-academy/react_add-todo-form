import React from 'react';

interface User {
  name: string,
  email: string,
}

export const UserInfo: React.FC<User> = ({ name, email }) => (
  <a className="UserInfo" href={email}>
    {name}
  </a>
);
