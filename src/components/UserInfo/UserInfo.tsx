import React from 'react';

interface UserInfoProps {
  name: string;
  email: string;
}

export const UserInfo: React.FC<UserInfoProps> = ({ name, email }) => {
  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
