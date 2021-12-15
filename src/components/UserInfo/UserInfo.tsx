import React from 'react';
import { User } from '../../types/User';

import './UserInfo.scss';

export const UserInfo: React.FC<User> = ({ name, email }) => {
  return (
    <>
      <h3 className="todoList__userName">{`Name: ${name}`}</h3>
      <div className="todoList__userEmail">{`E-mail: ${email}`}</div>
    </>
  );
};
