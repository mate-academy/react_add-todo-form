import React from 'react';
import { User } from '../../types/User';
import './UserInfo.scss';

type Props = {
  user: User,
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <div className="UserInfo">
      <img
        className="UserInfo__image"
        src="https://img.icons8.com/ios/50/000000/badge.png"
        alt="IconName"
      />
      <p className="UserInfo__item">
        {user ? user.name : null}
      </p>

      <img
        className="UserInfo__image"
        src="https://img.icons8.com/ios/50/000000/username.png"
        alt="IconUserName"
      />
      <p className="UserInfo__item">
        {user ? user.username : null}
      </p>

      <img
        className="UserInfo__image"
        // eslint-disable-next-line
        src="https://img.icons8.com/external-nawicon-detailed-outline-nawicon/64/000000/external-email-communication-nawicon-detailed-outline-nawicon-2.png"
        alt="IconEmail"
      />
      <p className="UserInfo__item">
        {user ? user.email : null}
      </p>
    </div>
  );
};
