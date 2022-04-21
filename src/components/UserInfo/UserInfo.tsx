import React from 'react';
import { User } from '../Types/Types';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <div className="userInfo">
    {`Name: ${user.name} `}
    {`E-mail: ${user.email}`}
  </div>
);
