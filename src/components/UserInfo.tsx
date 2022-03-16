import React from 'react';
import { User } from '../api/user';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <>
    <p>{` User name: ${user.name}`}</p>
    <p>{` User email: ${user.email}`}</p>
  </>
);
