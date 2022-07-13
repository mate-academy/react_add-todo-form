import React from 'react';
import { User } from '../../Types/User';
import './UserInfo.scss';

type Props = {
  user: User
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <div className="user">
    <h2 className="user__title title is-4">{`Name: ${user.name}`}</h2>
    <a className="user__email" href={`mailto:${user.email}`}>{`Email: ${user.email}`}</a>
  </div>
);
