import { User } from '../../type/User';

type UserProps = {
  user: User;
};

export const UserInfo: React.FC<UserProps> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user.name}
  </a>
);
