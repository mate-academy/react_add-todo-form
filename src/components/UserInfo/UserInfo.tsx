import { FC } from 'react';
import { User } from '../../types/user';

type Props = {
  user: User,
};

export const UserInfo: FC<Props> = ({ user }) => {
  const { email, name } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
