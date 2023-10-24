import React from 'react';

import usersFromServer from '../../api/users';

type Props = {
  userId: number,
};

const findUserById = (users, id) => {
  return users.find((user) => (id === user.id));
};

export const UserInfo: React.FC<Props> = ({
  userId,
}) => {
  const user = findUserById(usersFromServer, userId);

  return (
    <a className="UserInfo" href={user.email}>
      {user.name}
    </a>
  );
};
