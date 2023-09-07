import React from 'react';

// import usersFromServer from '../../api/users';
// import { findUserByID } from '../../helpers/findUserById';
import { UserType } from '../../types';

type Props = {
  user: UserType,
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  const { name, email } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
