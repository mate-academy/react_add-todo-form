import { User } from '../../types/User';
import { FC } from 'react';

interface Props {
  user: User;
}

export const UserInfo: FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
