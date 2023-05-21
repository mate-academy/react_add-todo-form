import { User } from '../../types/User';

interface UserInfoProps {
  user: User
}

export const UserInfo = ({ user }: UserInfoProps) => {
  const { email, name } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
