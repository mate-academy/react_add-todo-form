import React from 'react';

export type User = {
  id: number;
  name: string;
  email: string;
};

export type Todo = {
  id: number;
  title: string;
  user: User;
  completed: boolean;
};

type UserInfoProps = {
  user: {
    name: string;
    email?: string;
  };
};

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  if (!user || !user.email) {
    return null;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
