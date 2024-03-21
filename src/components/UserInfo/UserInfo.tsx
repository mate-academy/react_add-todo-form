import { FC } from 'react';

import { User } from '../../types/types';

type Props = {
  user: User | undefined;
};

export const UserInfo: FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user?.email}`}>
      {user?.name}
    </a>
  );
};
