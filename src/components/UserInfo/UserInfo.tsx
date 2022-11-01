import { FC } from 'react';
import { User } from '../../types';

type Props = {
  user: User
};

export const UserInfo: FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
