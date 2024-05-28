import { User } from '../../types/User';

type Props = {
  user: User | undefined;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <a className="UserInfo" href={user ? `mailto:${user.email}` : '#'}>
    {user ? user.name : 'Unknown user'}
  </a>
);
