import { FC } from 'react';
import { User } from '../../types/User';

type Props = {
  user: User;
};

export const UserInfo: FC<Props> = ({ user }) => {
  const {
    name,
    email,
  } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
