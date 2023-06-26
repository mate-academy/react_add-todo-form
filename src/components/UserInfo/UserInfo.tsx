import { FC } from 'react';
import { User } from '../../tipes';

type Props = {
  user: User | undefined,
};

export const UserInfo: FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo" href={user?.email}>
      { user?.name }
    </a>
  );
};
