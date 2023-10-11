import React from 'react';

interface UserInfoProps {
  userName: string;
  userLink: string;
}

export const UserInfo: React.FC<UserInfoProps> = (
  { userName, userLink },
) => {
  return (
    <a className="UserInfo" href={userLink}>
      {userName}
    </a>
  );
};
