import React from 'react';

interface UserInfoProps {
  user: { id: number; name: string; email: string };
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};

