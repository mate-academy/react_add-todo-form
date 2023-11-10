import { FC } from 'react';
import usersFromServer from '../../api/users';

export const UserInfo: FC<{ userId: number }> = ({ userId }) => {
  const currentUser = usersFromServer.find((item) => item.id === userId);

  if (!currentUser) {
    return null;
  }

  const { email, name } = currentUser;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
