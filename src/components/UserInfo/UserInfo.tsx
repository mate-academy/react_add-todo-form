import { FC } from 'react';
import './UserInfo.scss';
import { User } from '../../types/User';

type Props = {
  user: User
};

export const UserInfo: FC<Props> = ({ user: { name, email } }) => (
  <a className="UserInfo" href={`mailto:${email}`}>
    {name}
  </a>
);
