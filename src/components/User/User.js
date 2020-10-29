import React from 'react';
import './User.css';

import { UserShape } from '../shapes/UserShape';

export const User = ({ name }) => (
  <div className="user ui attached segment">
    <p className="user__name">{`User: ${name}`}</p>
  </div>
);

User.propTypes = UserShape;
