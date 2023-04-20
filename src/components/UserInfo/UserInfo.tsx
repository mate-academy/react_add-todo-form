import React from 'react';
import { User } from '../../types/User';

type Props = {
  user: User
};

export const UserInfo: React.FC<Props> = ({ user: { id, email, name } }) => (
  <a
    key={id}
    className="UserInfo"
    href={`mailto:${email}`}
  >
    {name}
  </a>
);
