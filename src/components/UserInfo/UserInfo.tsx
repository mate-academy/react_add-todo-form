import React from 'react';
import { User } from '../Types/User';

type Props = {
  user: User,
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <>
    <h3>Info about User</h3>
    <ul>
      <li>
        {`Name: ${user.name}`}
      </li>
      <li>
        {`E-mail: ${user.email}`}
      </li>
    </ul>
  </>
);
