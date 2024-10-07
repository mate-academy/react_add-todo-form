import { User } from '../../types/User';

interface UserInfoProps {
  user: User | null;
}

export const UserInfo = ({ user }: UserInfoProps) => {
  if (!user) {
    return null;
  }

  return (
    <div>
      <span>{user.name}</span>
      <a href={`mailto:${user.email}`}>{user.email}</a>
    </div>
  );
};
