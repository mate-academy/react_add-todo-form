import { FC } from 'react';
import './UserInfo.scss';
import { User } from '../../types/User';

interface Props {
  user: User;
}

export const UserInfo: FC<Props> = ({ user }) => {
  const { name, email } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
