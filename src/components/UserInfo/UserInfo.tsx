import React from 'react';
import { User } from '../../api/types/User'

type UserInfoProps = {
  user: User | null;
};

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <>
      {user && (
        <a className="UserInfo" href={`mailto:${user.email}`}>
          {user.name}
        </a>
      )}
    </>
  );
};
export default UserInfo;
