import { FC } from 'react';
import usersFromServer from '../../api/users';

export const UserInfo: FC<{ userId: number }> = ({ userId }) => {
  const currentUser = usersFromServer.filter(item => item.id === userId);

  if (!currentUser[0]) {
    return null;
  }

  const { email, name } = currentUser[0];

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
