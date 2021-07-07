import React from 'react';
import { UserShape } from './UserShape';

export const User = React.memo(
  ({ name }) => (
    <div>
      <strong>
        Person
      </strong>
      {' : '}
      {name}
    </div>
  ),
);

User.propTypes = UserShape;
