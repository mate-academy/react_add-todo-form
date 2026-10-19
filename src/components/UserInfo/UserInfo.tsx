import { UserInfoProps } from '../types-of-omponents';

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  if (!user) {
    return;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
