import React from 'react';
import { User } from '../../types/User';

interface Props {
  user: User;
}

export const UserInfo: React.FC<Props> = ({
  user: {
    name, email,
  },
}) => user && (
  <a className="UserInfo" href={`mailto:${email}`}>
    {name}
  </a>
);
