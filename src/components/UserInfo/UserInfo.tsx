import { User } from '../../types/User';

interface UserInfoProps {
  user: User;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div className="UserInfo" data-cy="userInfo">
      <a className="UserInfo" href={`mailto:${user.email}`}>
        {user.name}
      </a>
    </div>
  );
};
