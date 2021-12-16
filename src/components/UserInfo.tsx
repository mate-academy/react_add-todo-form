import React from 'react';
import { User } from '../types';

type Props = {
  user: User,
};

const UserInfo: React.FC<Props> = ({ user }) => (
  <div className="user">
    <p className="userParagraph">{`Name: ${user.name}`}</p>
    <p className="userParagraph">{`Email: ${user.email}`}</p>
  </div>
);

export default UserInfo;
