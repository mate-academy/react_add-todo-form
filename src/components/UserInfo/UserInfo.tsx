import React from 'react';
import { Todo } from '../../App';
import './UserInfo.scss';

type Props = {
  user: Todo['user'];
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user?.email}`}>
      {user?.name}
    </a>
  );
};
