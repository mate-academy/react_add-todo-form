import { FC } from 'react';
import { UserExist } from '../../types';

export const UserInfo: FC<UserExist> = ({ user }) => {
  return (
    user && (
      <a className="UserInfo" href={`mailto:${user.email}`}>
        {user.name}
      </a>
    )
  );
};
