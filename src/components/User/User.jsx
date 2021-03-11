import React from 'react';
import { UserType } from '../../Types/types';

import './User.css';

export function User({ user }) {
  return (
    <p className="App__user">{user.name}</p>
  );
}

User.propTypes = {
  UserType,
}.isRequired;
