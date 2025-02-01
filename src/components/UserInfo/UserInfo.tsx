import { FC } from 'react';
import { User } from '../../types';

type Props = {
  user?: User;
};

export const UserInfo: FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo" href={user ? `mailto:${user.email}` : undefined}>
      {user && user.name}
    </a>
  );
};
