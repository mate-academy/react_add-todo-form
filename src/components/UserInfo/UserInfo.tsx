import { FC } from 'react';
import { User } from '../../types/User';
import './UserInfo.scss';

interface Props {
  user: User;
}

export const UserInfo: FC<Props> = ({ user }) => {
  const { email, name } = user;

  return (
    <a href={`mailto:${email}`} className="UserInfo">
      {name}
    </a>
  );
};
