import { User } from '../../types/User';
import './UserInfo.scss';

type UserInfoProps = {
  user: User | null
};

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user?.email}`}>
    {user?.name}
  </a>
);
