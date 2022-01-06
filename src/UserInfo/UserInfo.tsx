import React from 'react';
import { User } from '../types/User';

import './UserInfo.scss';

type Props = {
  user: User,
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <>
    <ul className="list">
      <li className="list__item">
        Name:
        {' '}
        <span>{`${user.name}`}</span>
      </li>
      <li className="list__item">
        Email:
        {' '}
        <span>{`${user.email}`}</span>
      </li>
    </ul>
  </>
);
