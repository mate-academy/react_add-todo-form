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
    email: string;
  };
};

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div className="UserInfo">
      <a href={`mailto:${user.email}`} className="UserInfo__link">
        {user.name}
      </a>
    </div>
  );
};
