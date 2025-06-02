import { User } from '../../types/User';

interface UserInfoProps {
  user: User | null;
}
export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  if (!user) {
    return <span className="UserInfo">No user info</span>;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
