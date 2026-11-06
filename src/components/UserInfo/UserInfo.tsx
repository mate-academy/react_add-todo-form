import { User } from '../../types';
import { FC } from 'react';

type Props = {
  user: User | null;
};

export const UserInfo: FC<Props> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user?.email}`}>
    {user?.name}
  </a>
);
