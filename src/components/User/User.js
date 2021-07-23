import React from 'react';
import { UserType } from '../../types';
import './User.css';

export function User({ user }) {
  return (
    <span className="user__name">
      {user.name}
    </span>
  );
}

User.propTypes = {
  user: UserType.isRequired,
};
