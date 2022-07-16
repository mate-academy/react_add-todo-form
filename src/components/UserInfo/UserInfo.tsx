import React from 'react';
import { User } from '../../types/User';
import './UserInfo.scss';

type Prop = {
  user: User | null;
};

export const UserInfo: React.FC<Prop | null> = ({ user }) => (
  <>
    {user && (
      <div className="UserInfo">
        <p
          data-cy="username"
          className="UserInfo__username"
        >
          {user.name}
        </p>
        <a
          href="https://mail.google.com/mail/u/0/#inbox?compose=new"
          data-cy="email"
          className="UserInfo__email"
          target="blank"
        >
          {user.email}
        </a>
      </div>
    )}
  </>
);
