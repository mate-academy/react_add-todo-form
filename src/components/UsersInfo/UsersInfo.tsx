import React from 'react';
import { Users } from '../types/types';

import './UsersInfo.scss';

type Props = {
  user: Users;
};

export const UsersInfo:React.FC<Props> = ({ user }) => (
  <div className="userInfo">
    <span>{`Name: ${user.name}`}</span>
    <span>{`Username: ${user.username}`}</span>
    <span>{`Email: ${user.email}`}</span>
  </div>
);
