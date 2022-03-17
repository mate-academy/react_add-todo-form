import React from 'react';

import { User } from '../../types/User';

export const UserInfo: React.FC<User> = ({ name, email, phone }) => (
  <div className="user">
    <h3 className="user__name">{ name }</h3>
    <h3 className="user__phone">{ phone }</h3>
    <h3 className="user__email">{ email }</h3>
  </div>
);
