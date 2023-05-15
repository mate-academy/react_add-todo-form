import { User } from '../../react-app-env';

interface UserInfoProps {
  user: User,
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <a
      className="UserInfo"
      href={`mailto:${user.email}`}
    >
      {user.name}
    </a>
  );
};
