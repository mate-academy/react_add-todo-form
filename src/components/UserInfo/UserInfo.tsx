import React from 'react';
import { User } from '../../interfaces/User';

interface Props {
  user: User,
}

export const UserInfo: React.FC<Props> = ({ user }) => (
  <>
    {user.name}
    <br />
    <a href={`mailto:${user.email}`}>{user.email}</a>
    <br />
    {'User ID: '}
    {user.id}
  </>
);
