import users from '../../api/users';
import { User } from '../../types/User';

type Props = {
  userId: number,
};

function findUserById(id: number): User | null {
  return users.find(user => user.id === id) || null;
}

export const UserInfo: React.FC<Props> = ({ userId }) => {
  const user = findUserById(userId);

  return (
    <a
      className="UserInfo"
      href={`mailto:${user?.email}`}
    >
      {user?.name}
    </a>
  );
};
