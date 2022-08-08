import React from 'react';

export interface User {
  id: number,
  name: string,
  email: string,
}

type Props = {
  user: User,
};

export const UserInfo:React.FC<Props> = ({ user }) => (
  <>
    <span data-cy="username">
      {user.name}
    </span>
    <br />
    <span data-cy="email">
      {user.email}
    </span>
    <br />
  </>
);
