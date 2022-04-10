import React from 'react';
import { User } from '../../type/user';
import '../TodoInfo/TodoInfo.scss';

type Props = {
  user: User,
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <div className="card">
      <div className="card__item">
        <p><strong>Name:&nbsp;</strong></p>
        <p>{user.name}</p>
      </div>
      <div className="card__item">
        <p><strong>Email:&nbsp;</strong></p>
        <p>{user.email}</p>
      </div>
    </div>
  );
};
