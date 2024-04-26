import React from 'react';

interface UserProps {
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  } | null;
}

export const UserInfo: React.FC<UserProps> = ({ user }) => {
  return (
    <>
      <a className="UserInfo" href={`mailto:${user?.email}`}>
        {user?.name}
      </a>
    </>
  );
};
