import React from 'react';
import { User } from '../../types/User';
import { UserInfo } from '../UserInfo';

type Props = {
  users: User[];
};

export const UserList: React.FC<Props> = ({ users }) => (
  <>
    {users.map(user => (
      <UserInfo key={user.id} user={user} />
    ))}
  </>
);
