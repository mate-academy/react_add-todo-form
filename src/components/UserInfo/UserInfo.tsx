import { FC } from 'react';
import { User } from '../../types';

type UserInfoProps = {
  user?: User;
};

export const UserInfo: FC<UserInfoProps> = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <a className="UserInfo docs-creator" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
