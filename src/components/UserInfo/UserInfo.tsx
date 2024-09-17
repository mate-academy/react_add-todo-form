import React from 'react';

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
} | null;

interface Props {
  user: User;
}

export const UserInfo: React.FC<Props> = ({ user }) =>
  user ? (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  ) : null;
