import React from 'react';
import { UserType } from '../../types';
import './User.scss';

export const User = ({ user }) => (
  <div className="User">
    <span className="User__name">
      {user.name}
    </span>
    <span className="User__nick">
      nick:
      <br />
      <i>{user.username}</i>
    </span>
  </div>
);

User.propTypes = {
  user: UserType.isRequired,
};
