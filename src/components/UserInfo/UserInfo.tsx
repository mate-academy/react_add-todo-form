import React from 'react';
import { User } from '../../types/User';

type Props = {
  user: Required<User>;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <>
      <span>
        &#x1F464;
        {user.name}
      </span>

      <span>
        &#x1F4E7;
        {user.email}
      </span>

      <span>
        &#x1F4DE;
        {user.phone}
      </span>
    </>
  );
};
