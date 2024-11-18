import { FC } from 'react';
import { User } from '../../types/types';

export const UserInfo: FC<{ user: User }> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`} key={user.id}>
      {user.name}
    </a>
  );
};
