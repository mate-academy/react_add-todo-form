import { User } from '../../types/User';

type UserProps = {
  user: User,
};

export const UserInfo: React.FC<UserProps> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user.name}
  </a>
);
