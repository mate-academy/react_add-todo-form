import React from 'react';
import { User } from '../types/User';
import './UserInfo.scss';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <>
    <h3 className="userInfo__name">{`Name: ${user.name}`}</h3>
    <a href={user.email} className="userInfo__email">{`${user.email}`}</a>
  </>
);
