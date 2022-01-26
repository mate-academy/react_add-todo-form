import React from 'react';
import './UserInfo.scss';

export const UserInfo: React.FC<User> = ({ name, email }) => (
  <div className="shortInfoOfUser">
    <strong className="shortInfoOfUser__name">{name}</strong>
    <span
      className="shortInfoOfUser__email"
    >
      {email}
    </span>
  </div>
);
