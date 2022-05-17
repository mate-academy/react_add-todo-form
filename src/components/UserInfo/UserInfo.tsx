import { FC, memo } from 'react';
import { User } from '../../types';
import './UserInfo.scss';

export const UserInfo: FC<User> = memo(({ name, email }) => (
  <div className="userInfo">
    <h3 className="userInfo__name">{name}</h3>
    <p className="userInfo__email">{email}</p>
  </div>
));
