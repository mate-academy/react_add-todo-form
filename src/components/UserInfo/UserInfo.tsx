import { FC } from 'react';
import { IUser } from '../../types/User';

type TUserInfo = {
  user: IUser | null;
};

export const UserInfo: FC<TUserInfo> = ({ user }) => (user ? (
  <a className="UserInfo" href={`mailto:${user?.email}`}>
    {user?.name}
  </a>
) : null);
