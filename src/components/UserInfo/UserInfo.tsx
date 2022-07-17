import React from 'react';
import { User } from '../../type/User';
import './UserInfo.scss';

type Props = {
  completed: boolean;
  user: User | null
};

export const UserInfo: React.FC <Props> = ({ user, completed }) => (
  <div className="media">
    <div className="media-content">
      <div
        className={`indicator ${completed
          ? 'indicator--true'
          : 'indicator--false'}`}
      >
        <p
          className="title is-4 "
          data-cy="username"
        >
          {user?.name}

        </p>
      </div>
      <div className="card-content">
        <p className="subtitle is-6">{user?.username}</p>
        <a
          href="mailto:"
          className="subtitle is-6"
          data-cy="email"
        >
          {user?.email}

        </a>
      </div>

    </div>
  </div>
);
