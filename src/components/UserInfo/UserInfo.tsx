import { FC } from 'react';
import { User } from '../../types';

type Props = {
  user?: User;
};

export const UserInfo: FC<Props> = ({ user }) => {
  if (!user) {
    return;
  }

  return (
    user && (
      <a className="UserInfo" href={`mailto:${user.email}`}>
        {user.name}
      </a>
    )
  );
};
