import React from 'react';
import './Userinfo.scss';
import { UserInfoProps } from '../../typedefs';

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const {
    name,
    email,
  } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};

export default UserInfo;
