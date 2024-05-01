import { User } from '../../types/user';

export const UserInfo: React.FC<{ user: User }> = ({ user }) => {
  return (
    <a href={`mailto:${user.email}`} className="UserInfo">
      {user.name}
    </a>
  );
};
