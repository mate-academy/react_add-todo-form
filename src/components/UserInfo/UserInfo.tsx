import { FC } from 'react';
import { User } from '../../types/User';
import './UserInfo.scss';

type Props = Omit<User, 'id'>;

export const UserInfo: FC<Props> = ({ name, email }) => {
  return (
    <div className="user-info">
      <span>
        {name}
      </span>
      {' '}
      <a href="mailto:{mail}">{email}</a>
    </div>
  );
};
