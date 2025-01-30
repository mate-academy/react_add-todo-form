import { User } from '../../App';

interface UserInfoProps {
  user: User | null;
}

export const UserInfo: React.FC<UserInfoProps> = user => {
  if (!user) {
    return <span>No user available</span>;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.user?.email}`}>
      {user.user?.name}
    </a>
  );
};
