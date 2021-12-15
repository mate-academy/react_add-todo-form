import React from 'react';
import { User } from '../../types';

type Props = {
  user: User,
};

export const UserInfo: React.FC<Props> = (props) => {
  const { user } = props;
  const { name, email } = user;

  return (
    <>
      <div className="user__name">
        {name}
      </div>
      <div className="user__email">
        {email}
      </div>
    </>
  );
};
