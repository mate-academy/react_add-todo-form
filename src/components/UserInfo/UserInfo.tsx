import { User } from '../../types';

interface UserInfoProps {
  user: User | undefined;
}

export const UserInfo = ({ user }: UserInfoProps) => {
  if (!user) {
    return null;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
