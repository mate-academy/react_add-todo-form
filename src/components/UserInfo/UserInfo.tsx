import React from 'react';
import usersFromServer from '../../api/users';

type UserInfoProps = {
  userId: number;
};

export const UserInfo: React.FC<UserInfoProps> = ({ userId }) => {
  const user = usersFromServer.find(u => u.id === userId);

  if (!user) {
    return null;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
