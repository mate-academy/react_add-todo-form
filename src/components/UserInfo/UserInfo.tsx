import { User } from '../../services/types';

type UserInfoProps = {
  user: User;
};
export const UserInfo: React.FC<UserInfoProps> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user.name}
  </a>
);
