import React from 'react';
import { UserProps } from '../../userProps';

interface Props {
  user: UserProps;
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
