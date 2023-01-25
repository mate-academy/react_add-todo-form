import React from 'react';
import { User } from '../../Types/User';
import './Userinfo.scss';

type Person = {
  user: User;
};

export const UserInfo: React.FC<Person> = ({ user }) => {
  const {
    email,
    name,
  } = user;

  return (
    <a
      className="UserInfo"
      href={`mailto:${email}`}
    >
      {`${name}`}
    </a>
  );
};
