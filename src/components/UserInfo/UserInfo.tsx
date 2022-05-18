import React from 'react';
import { User } from '../../types/User';

type Props = Omit<User, 'id'>;

export const UserInfo: React.FC<Props> = ({ name, username, email }) => {
  return (
    <>
      <p>{`Task for ${name} ${username}`}</p>
      <p>{email}</p>
    </>
  );
};
