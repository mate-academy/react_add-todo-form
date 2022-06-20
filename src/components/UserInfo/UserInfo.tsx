import React from 'react';

interface Props {
  name: string;
  username: string;
  email: string;
}

export const UserInfo: React.FC<Props> = ({
  name,
  username,
  email,
}) => (
  <div>
    <p>{`Name: ${name}`}</p>
    <p data-cy="username">{`User Name: ${username}`}</p>
    <p data-cy="email">{`Email: ${email}`}</p>
  </div>
);
