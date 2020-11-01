import React from 'react';

import { UserShape } from '../../shapes/UserShape';

export const User = ({ name }) => (
  <div className="ui attached segment">
    <p>{`User: ${name}`}</p>
  </div>
);

User.propTypes = UserShape;
