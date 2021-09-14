import React from 'react';
import { User } from '../../types/User';

type Props = {
  user: User,
};

export const UserInfo: React.FC<Props> = (props) => {
  const { user } = props;
  const { name, username, email } = user;

  return (
    <>
      <div className="user__name">
        {name}
      </div>
      <div className="user__username">
        {username}
      </div>
      <div className="user__email">
        {email}
      </div>
    </>
  );
};
