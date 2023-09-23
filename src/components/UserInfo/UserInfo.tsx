import React from 'react';

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}

interface UserInfoProps {
  user?: User;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  if (!user) {
    return <span className="UserInfo">Unknown User</span>;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
