// import usersFromServer from '../../api/users';

import { User } from '../types/User';

interface Props {
  user: User;
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  // const user = usersFromServer.find(user => user.id === userId);

  return (
    <a className="UserInfo" href={`mailto:${user?.email}`}>
      {user?.name}
    </a>
  );
};
