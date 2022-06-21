import React from 'react';
import { User } from '../../Types/Types';

type Props = {
  user: User,
};

const UserInfo: React.FC<Props> = ({ user }) => (
  <>
    <h3 data-cy="username" className="has-text-success">
      Username:
      {' '}
      {user.name}
    </h3>
    <span data-cy="email" className="has-text-primary">
      Email:
      {' '}
      {user.email}
    </span>
  </>
);

export default UserInfo;
