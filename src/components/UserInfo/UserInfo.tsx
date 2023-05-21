import { User } from '../../types/User';

interface UserInfoProps {
  user: User,
}

export const UserInfo = ({ user }: UserInfoProps) => {
  const { name } = user;

  return (
    <a className="UserInfo" href={`mailto:${user?.email}`}>
      {name}
    </a>
  );
};
