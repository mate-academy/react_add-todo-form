import { FC } from 'react';
import { User } from '../../types/User';

interface Props {
  user: User | null,
}

export const UserInfo: FC<Props> = ({ user }) => {
  return (
    user
    && (
      <a className="UserInfo" href={`mailto:${user.email}`}>
        {user.name}
      </a>
    )
  );
};
