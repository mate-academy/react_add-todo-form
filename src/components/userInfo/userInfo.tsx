import { FC, memo } from 'react';
import { User } from '../types/types';
import './userInfo.scss';

export const UserInfo: FC<User> = memo(({ name, email }) => (
  <div className="userInfo">
    <p className="userInfo__name">{name}</p>
    <p className="userInfo__email">{email}</p>
  </div>
));
