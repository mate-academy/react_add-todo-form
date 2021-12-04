import React from 'react';
import { User } from '../types/User';

type Props = {
  user: User,
};

export const UserInfo:React.FC<Props> = ({ user }) => (
  <>
    <td>{user.name}</td>
    <td>{user.username}</td>
    <td>{user.email}</td>
  </>
);
