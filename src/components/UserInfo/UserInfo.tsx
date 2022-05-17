import React from 'react';

import { User } from '../../types/User';

import './UserInfo.scss';

type Props = {
  user: User;
};

const UserInfo: React.FC<Props> = ({ user }) => (
  <div className="todo-item__user user">
    <div className="user__name">
      <a
        href={`malito:${user?.email}`}
        className="user__link user__link-name"
      >
        {user?.name}
      </a>
    </div>

    <div className="user__email">
      <a
        href={`malito:${user?.email}`}
        className="user__link"
      >
        {user?.email}
      </a>
    </div>
  </div>
);

export default UserInfo;
