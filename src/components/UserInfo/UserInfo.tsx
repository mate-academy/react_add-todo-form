import { FC } from 'react';
import { IUser } from '../../types/User.types';

interface IUserInfo {
  user: IUser | null;
}

export const UserInfo: FC<IUserInfo> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user?.email}`}>
      {user?.name}
    </a>
  );
};
