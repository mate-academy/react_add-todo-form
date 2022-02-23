import React from 'react';
import { User } from '../../Types/User';

export const UserInfo: React.FC<User> = ({ name, email }) => (
  <>
    <p>
      {`Name: ${name}`}
    </p>
    <p>
      {`Email: ${email}`}
    </p>
  </>
);
