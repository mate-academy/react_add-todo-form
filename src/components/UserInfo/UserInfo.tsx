import { FC } from 'react';
import { User } from '../../types/User';

type Props = {
  user: User | null,
};

export const UserInfo: FC<Props> = (props) => {
  const { user } = props;

  return (
    <a className="UserInfo" href={`mailto:${user?.email}`}>
      {user?.name}
    </a>
  );
};
