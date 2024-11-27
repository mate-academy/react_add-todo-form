import { User } from '../../api/type/type';
import './UserInfo.scss';

interface UserProps {
  user: User | null;
}

export const UserInfo: React.FC<UserProps> = ({ user }) => {
  return (
    <a className="UserInfo" href={user ? `mailto:${user.email}` : '#'}>
      {user ? user.name : 'User is not found'}
    </a>
  );
};
