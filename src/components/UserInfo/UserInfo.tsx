import React from 'react';
import usersFromServer from '../../api/users';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type UserInfoProps = {
  userId: number;
};

export const UserInfo: React.FC<UserInfoProps> = ({ userId }) => {
  const user = usersFromServer.find(
    (findedUser: User) => findedUser.id === userId,
  );

  return (
    <>
      {user && (
        <a className="UserInfo" href={`mailto:${user.email}`}>
          {user.name}
        </a>
      )}
    </>
  );
};
