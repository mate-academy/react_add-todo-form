import { User } from '../../../types/User';

interface UserInfoPros {
  user: User,
}

export const UserInfo = ({ user }: UserInfoPros) => {
  return (
    <a className="UserInfo" href={`mailto:${user?.email}`}>
      {user?.name}
    </a>
  );
};
