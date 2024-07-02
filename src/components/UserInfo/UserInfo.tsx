import React from 'react';

<<<<<<< HEAD
export interface User {
  name: string;
  email: string;
}

interface UserInfoProps {
  user: User | null;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
=======
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Props {
  user: User;
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <div className="UserInfo">
      <h3 className="UserInfo__name">{user.name}</h3>
      <a href={`mailto:${user.email}`} className="UserInfo__email">
        {user.email}
      </a>
    </div>
>>>>>>> 9a9744cbed8c7de13c378f61c6037a52c7e3c6ea
  );
};
