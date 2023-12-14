import usersFromServer from '../../api/users';

interface UserInfoProps {
  userId: number;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export const UserInfo: React.FC<UserInfoProps> = ({ userId }) => {
  const user: User = usersFromServer.find(u => u.id === userId);

  return (
    <div className="UserInfo">
      <a className="UserInfo__email" href={`mailto:${user.email}`}>
        {user.name}
      </a>

    </div>
  );
};
