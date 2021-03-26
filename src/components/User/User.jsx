import React from 'react';
import { UserType } from '../../types';

export const User = function User({ user }) {
  return (
    <span>
      {user.name}
    </span>
  );
};

User.propTypes = {
  user: UserType.isRequired,
};
