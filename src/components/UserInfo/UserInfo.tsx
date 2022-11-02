import React from 'react';
import { User } from '../../react-app-env';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({
  user: {
    name,
    email,
  },
}) => (
  <a className="UserInfo" href={`mailto: ${email}`}>
    {name}
  </a>
);
