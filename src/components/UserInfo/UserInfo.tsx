import React from 'react';
import { UserType } from '../../types/UserType';

interface Props {
  user: UserType;
}

const UserInfo: React.FC<Props> = ({ user }) => {
  const {
    name,
    email,
  } = user;

  return (
    <>
      <div className="nameUser">{name}</div>
      <div className="emailUser">{email}</div>
    </>
  );
};

export default UserInfo;
