import React from 'react';
import { typeUser } from '../types';

const User = ({ user }) => (
  <p>
    {`executor: ${user.name}`}
  </p>
);

User.propTypes = {
  user: typeUser.isRequired,
};

export default User;
