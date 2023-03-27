import React from 'react';
import { User } from '../../types/User';

type Props = {
  userId: number,
  users: User[],
};

export const UserInfo: React.FC<Props> = ({ userId, users }) => {
  const foundUser = users.find(userData => userData.id === userId);

  return (
    <a className="UserInfo" href={`mailto:${foundUser ? foundUser.email : ''}`}>
      {foundUser ? foundUser.name : ''}
    </a>
  );
};
