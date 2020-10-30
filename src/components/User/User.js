import React from 'react';
import { UserTypes } from './UserTypes';

import './User.css';

export const User = ({ name }) => (
  <div className="user">
    <h4>User:</h4>
    <p>{name}</p>
  </div>
);

User.propTypes = UserTypes;
