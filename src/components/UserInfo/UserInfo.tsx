import React from 'react';
import { User } from '../../types/User';
import './UserInfo.scss';

type Props = {
  userInf: User,
};

export const UserInfo: React.FC<Props> = ({ userInf }) => (
  <>
    <p className="userInfo__title">
      Name:
      {' '}
      {userInf.name}
    </p>
    <p className="userInfo__text">
      Email:
      {' '}
      {userInf.email}
    </p>
    <div className="userInfo__mail">
      <a
        className="userInfo__link"
        href={`mailto:${userInf.email}`}
      >
        send email
      </a>
    </div>
  </>
);
