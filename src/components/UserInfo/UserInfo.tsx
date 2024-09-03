import React from 'react';

type UserInfoProps = {
  user: { id: number; name: string; email: string } | null;
};

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
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
