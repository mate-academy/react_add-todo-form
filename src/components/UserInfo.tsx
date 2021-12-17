import React from 'react';
import { User } from '../types/User';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <div>
      <p>{`Name: ${user.name}`}</p>
      <p>{`Email: ${user.email}`}</p>
    </div>
  );
};
