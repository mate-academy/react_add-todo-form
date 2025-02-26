import React from 'react';
import { IUser } from '../../interfaces/IUser';

type Prop = {
  user: IUser;
};
export const UserInfo: React.FC<Prop> = ({ user }) => {
  return (
    <a className="UserInfo" href={'mailto:' + user.email}>
      {user.name}
    </a>
  );
};
