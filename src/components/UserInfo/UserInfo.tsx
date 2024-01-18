import React from 'react';
import { TodowithUser } from '../types';

type Props = {
  user: TodowithUser['user']; // User
};

export const UserInfo:React.FC<Props> = ({ user }) => {
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
