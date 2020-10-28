import React from 'react';
import { UserShape } from '../../shapes/UserShape';

import './User.scss';

export const User = ({ user, completed }) => (
  <h5 className={completed
    ? 'name'
    : 'name name--completed'
  }
  >
    {user.name}
  </h5>
);

User.propTypes = UserShape.isRequired;
