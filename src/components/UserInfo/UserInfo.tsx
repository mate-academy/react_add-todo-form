import { User } from '../../types/User';
import './UserInfo.scss';

type UserInfoProps = {
  user: User;
};

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <a className="user-info" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
