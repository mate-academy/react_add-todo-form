import classNames from 'classnames';
import { UsersProps } from '../../types/User';
import React from 'react';

export const UserInfo: React.FC<{user : UsersProps}> = ({ user }) => (
  <a className={classNames('UserInfo')} href={`mailto:${user.email}`}>
    {user.name}
  </a>
);
