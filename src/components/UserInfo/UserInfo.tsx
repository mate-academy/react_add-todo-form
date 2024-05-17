import { ReactElement } from 'react';
import { User } from '../../types';

export const UserInfo = ({ user }: { user: User }): ReactElement => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
