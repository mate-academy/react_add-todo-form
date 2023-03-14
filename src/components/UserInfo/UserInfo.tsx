import { FC } from 'react';
import { User } from '../../Types/Types';

export const UserInfo: FC<{ user: User | null }> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user?.email}`}>
    {user?.name}
  </a>
);
