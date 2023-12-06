import { FC } from 'react';
import { User } from '../../Interfaces/Interfaces';

interface Props {
  user: User | null,
}

export const UserInfo: FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user?.email}`}>
      {user?.name}
    </a>
  );
};
