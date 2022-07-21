import React from 'react';
// eslint-disable-next-line import/extensions
import { User } from '../../types/User';

type Props = {
  user: User;
};

const UserInfo: React.FC<Props> = ({ user }) => (
  <div className="user">
    <p className="user__name" data-cy="username">
      {user.name}
    </p>
  </div>
);

export default UserInfo;
