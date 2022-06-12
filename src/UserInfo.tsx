import React from 'react';
import { User } from './Todo';

export type Props = {
  user: User
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <div className="todo__userInfo">
    <>
      <p className="todo__userName">
        <strong>
          {'User: '}
        </strong>
        {user.name}
      </p>
      <p className="todo__userEmail">
        <strong>
          {'Email: '}
        </strong>
        {user.email}
      </p>
    </>
  </div>
);
