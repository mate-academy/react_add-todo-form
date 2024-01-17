import React from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserInfoProps {
  user: User;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div className="UserInfo">
      <p>{`User Name: ${user.name}`}</p>
      <a href={`mailto:${user.email}`}>Send Email</a>
    </div>
  );
};
