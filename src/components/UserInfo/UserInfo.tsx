import React from 'react';
import { User } from '../../Type/User';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  const {
    name,
    username,
    email,
    phone,
  } = user;

  return (
    <div className="UserInfo">
      <h2>{`${name}`}</h2>
      <p>{`Username: ${username}`}</p>
      <p>{`Email: ${email}`}</p>
      <p>{`Phone: ${phone}`}</p>
    </div>
  );
};
