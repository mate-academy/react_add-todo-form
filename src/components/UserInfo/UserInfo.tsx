import React from 'react';
import './UserInfo.scss';

type Props = {
  user: User
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <div className="UserInfo">
      <p className="UserInfo__name">
        {user.name}
      </p>

      <a className="UserInfo__email" href={`mailto:${user.email}`}>
        {user.email}
      </a>
    </div>
  );
};
