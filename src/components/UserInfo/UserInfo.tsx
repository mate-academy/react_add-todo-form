import { FC } from 'react';
import { User } from '../../types/User';

type Props = {
  user: User,
};

export const UserInfo: FC<Props> = ({ user }) => (
  <a className="UserInfo" href={user.email}>
    {user.name}
  </a>
);
