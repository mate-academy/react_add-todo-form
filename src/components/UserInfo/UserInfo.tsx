import React from 'react';

type UserProps = {
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  } | null;
};

export const UserInfo: React.FC<UserProps> = ({ user }) => {
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
