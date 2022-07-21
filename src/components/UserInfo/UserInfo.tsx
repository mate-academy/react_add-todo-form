import React from 'react';
import { User } from '../../types/User';

export const UserInfo: React.FC<User> = ({ name, email, username }) => (
  <div>
    <p className="App__user">
      <span className="App__user-info">
        Username:
      </span>
      {username}
    </p>

    <p data-cy="username" className="App__user">
      <span className="App__user-info">
        Name:
      </span>
      {name}
    </p>

    <p data-cy="email" className="App__user">
      <span className="App__user-info">
        Email:
      </span>
      {email}
    </p>
  </div>
);
