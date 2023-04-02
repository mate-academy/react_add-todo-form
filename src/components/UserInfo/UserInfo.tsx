import React from 'react';
import './UserInfo.scss';
import { User } from '../../types/User';

interface Props {
  user: User,
  // eslint-disable-next-line react/no-unused-prop-types
  id: number,
  name: string,
  email: string
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  const { name, email } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
