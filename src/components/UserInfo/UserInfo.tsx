import React from 'react';
import { User } from '../../react-app-env';

type Props = {
  user: User | null;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <a className="UserInfo" href="mailto:Julianne.OConner@kory.org">
    {user?.name}
  </a>
);
