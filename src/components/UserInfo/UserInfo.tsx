import { User } from '../../types/Todo';

type UserInfoProps = {
  user: User;
};

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <a className="UserInfo" href={user.email}>
      {user.name}
    </a>
  );
};
