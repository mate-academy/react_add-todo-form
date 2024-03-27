import React from 'react';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const UserInfo: React.FC<{ user: User }> = ({ user }) => {
  const { name, email } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};

export default UserInfo;
