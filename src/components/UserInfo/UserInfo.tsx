import { User } from '../../api/type';

interface UserProps {
  user: User;
}

export const UserInfo: React.FC<UserProps> = ({ user }) => {
  return (
    <a className="UserInfo" href={user ? `mailto:${user.email}` : '#'}>
      {user ? user.name : 'User is not found'}
    </a>
  );
};
