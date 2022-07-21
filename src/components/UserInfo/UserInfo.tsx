import React from 'react';
import { User } from '../../types/User';

type Prop = {
  user: User | null;
};

export const UserInfo: React.FC<Prop | null> = ({ user }) => (
  <>
    {user && (
      <div className="UserInfo">
        <p className="UserInfo__username" data-cy="username">
          {user.name}
        </p>
        <a
          className="UserInfo__email"
          href="https://mail.google.com/mail/u/0/#inbox?compose=new"
          target="blank"
          data-cy="email"
        >
          {user.email}
        </a>
      </div>
    )}
  </>
);
