import { FC } from 'react';
import { User } from '../../types';
import './UserInfo.scss';

interface Props {
  user: User;
}

export const UserInfo: FC<Props> = ({ user: { name, email } }) => {
  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
