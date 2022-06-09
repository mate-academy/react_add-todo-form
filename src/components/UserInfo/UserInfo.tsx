import React from 'react';
import { User } from '../../react-app-env';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <div>
    <div className="subtitle is-5" data-cy="username">
      {`executor: ${user.name}`}
    </div>
  </div>
);
