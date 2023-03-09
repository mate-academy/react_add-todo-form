import { FC } from 'react';
import users from '../../api/users';
import { User } from '../../react-app-env';

interface Props {
  userId: number;
}

export const UserInfo: FC<Props> = ({ userId }) => {
  const user: User | undefined = users
    .find((oneUser: User) => oneUser.id === userId);

  return (
    <a className="UserInfo link" href={`mailto:${user?.email}`}>
      {user?.name}
    </a>
  );
};
