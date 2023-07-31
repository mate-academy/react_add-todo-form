import { User } from '../../types/User';

interface Props {
  user: User;
}

export const UserInfo: React.FC<Props> = ({ user }) => (
  <a className="UserInfo" href={user.email ? `mailto:${user.email}` : '#'}>
    {user.name}
  </a>
);
