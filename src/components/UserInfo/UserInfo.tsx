import React from 'react';
import { User } from '../../types';

type UserInfoProps = {
  user: User;
};

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  // const user = usersFromServer.find(userFound => userFound.id === userId);

  // if (!user) {
  //   return null;
  // }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
