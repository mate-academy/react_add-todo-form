import React from 'react';
import { User } from './types';

interface Props {
  user: User;
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  const {
    name, username, email,
  } = user;

  return (
    <>
      <div>{`Name: ${name}`}</div>
      <div>{`Username: ${username}`}</div>
      <div>{`Email: ${email}`}</div>
    </>
  );
};
