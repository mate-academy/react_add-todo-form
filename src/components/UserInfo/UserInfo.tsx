import React from 'react';
import { User } from '../../type/User';
import './UserInfo.scss';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <ul className="user">
    <li>{`Name: ${user.name}`}</li>
    <li>{`Username: ${user.username}`}</li>
    <li>{`Email: ${user.email}`}</li>
  </ul>
);
