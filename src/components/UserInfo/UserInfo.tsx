import React from 'react';

interface UserInfoProps {
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  } | undefined;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  if (!user) {
    return null;
  }

  const {
    name, username, email,
  } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`} key={username}>
      {name}
    </a>
  );
};

export { UserInfo };
