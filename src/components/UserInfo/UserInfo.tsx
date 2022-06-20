import React from 'react';
import { User } from '../../react-app-env';

interface Props {
  user: User | null;
}

const UserInfo: React.FC<Props> = ({ user }) => (
  <div>
    <p>{`Name: ${user ? user.name : 'Unknown'}`}</p>
    <p>{`Email: ${user ? user.email : 'Unknown'}`}</p>
  </div>
);

export default UserInfo;
