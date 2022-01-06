import React from 'react';
import { User } from '../types/User';
import './UserInfo.scss';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <>
    <td className="user user--name">{`${user.name}`}</td>
    <td className="user user--email">{`${user.email}`}</td>
  </>
);
