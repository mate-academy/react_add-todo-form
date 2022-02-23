import React from 'react';

import './UserInfo.scss';

type Props = {
  user: User,
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <div className="user-info">
    <div>
      <span className="user-info__name">Name:</span>
      <span className="user-info__name-value">{user.name}</span>
    </div>
    <div>
      <span className="user-info__email">Email:</span>
      <a href={`mailto:${user.email}`}>{user.email}</a>
    </div>
  </div>
);
