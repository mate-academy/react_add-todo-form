import React from 'react';

interface Props {
  name: string,
  email: string,
}

export const UserInfo: React.FC<Props> = ({ name, email }) => {
  return (
    <>
      <div data-cy="username">{`Name: ${name}`}</div>
      <div data-cy="email">{`Email: ${email}`}</div>
    </>
  );
};
