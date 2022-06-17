import React from 'react';

import { User } from '../../types/User';
import './UserInfo.scss';

type Props = Pick<User, 'name' | 'email'>;

export const UserInfo: React.FC<Props> = ({ name, email }) => (
  <div className="user-info">
    {name && (
      <p className="user-info__name">
        {'Responsible for implementation: '}
        <strong>{name}</strong>
      </p>
    )}

    {email && (
      <p className="user-info__email">
        {'Contact Email: '}
        <strong>{email}</strong>
      </p>
    )}
  </div>
);
