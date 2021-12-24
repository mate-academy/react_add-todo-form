import React from 'react';
import { User } from '../../types/User';

type Props = {
  user: User,
};

export const UserInfo:React.FC<Props> = ({ user }) => {
  return (
    <>
      <h3>{`User: ${user.name}`}</h3>
    </>
  );
};
