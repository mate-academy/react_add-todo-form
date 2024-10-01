import React from 'react';

type UserInfoProps = {
  email: string;
  name: string;
};

export const UserInfo: React.FC<UserInfoProps> = ({ email, name }) => {
  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
