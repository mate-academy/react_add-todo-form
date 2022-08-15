import { User } from '../../types/User';
import usersFromServer from '../../api/users';

type Props = {
  userId: number;
};

export const UserInfo:React.FC<Props> = ({ userId }) => {
  // const { id, name, username, email }:User[] = usersFromServer;
  const users:User[] = usersFromServer;

  const user = users.find(people => people.id === userId);

  return (
    <a className="UserInfo" href={user?.email}>
      {user?.name}
    </a>
  );
};
