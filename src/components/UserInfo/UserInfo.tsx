import React from 'react';
import { User } from '../../types/User';

import './UserInfo.scss';

type Props = {
  user: User | null;
};

export const UserInfo: React.FC<Props> = (props) => {
  const {
    user,
  } = props;

  return (
    <p className="user-info">
      <div className="user-info__item">
        <span className="user-info__title">
          Name:
          {' '}
        </span>
        {user?.name}
      </div>
      <a className="user-info__link" href={`mailto:${user?.email}`}>Email</a>
    </p>
  );
};
