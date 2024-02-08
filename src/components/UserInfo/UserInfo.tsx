import React from 'react';
import { getUserById } from '../../services/userServices';

type Props = {
  userId: number,
};

export const UserInfo: React.FC<Props> = ({ userId }) => {
  const getUser = getUserById(userId);

  return (
    <a className="UserInfo" href={`mailto:${getUser?.email}`}>
      {getUser?.name}
    </a>
  );
};
