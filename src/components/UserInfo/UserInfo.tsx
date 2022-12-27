import React from 'react';
import usersFromServer from '../../api/users';

type Props = {
  userId: number,
};

export const UserInfo: React.FC<Props> = ({ userId }) => {
  const user = usersFromServer.find(el => el.id === userId);

  return (
    <>
      {user
        && (
          <a className="UserInfo" href={`mailto:${user.email}`}>
            {user.name}
          </a>
        )}
    </>
  );
};
