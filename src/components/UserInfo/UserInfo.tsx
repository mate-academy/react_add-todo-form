import React from 'react';
// eslint-disable-next-line import/no-cycle
import { User } from '../../App';

interface Props {
  user: User;
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  const {
    email,
    name,
  } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
